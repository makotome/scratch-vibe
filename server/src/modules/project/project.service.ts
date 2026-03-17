import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { isPublic: true },
      relations: ['owner'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { ownerId: userId },
      relations: ['owner'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(projectData: Partial<Project>, userId: string): Promise<Project> {
    const project = this.projectRepository.create({
      ...projectData,
      ownerId: userId,
    });
    return this.projectRepository.save(project);
  }

  async update(id: string, projectData: Partial<Project>, userId: string): Promise<Project> {
    const project = await this.findOne(id);

    if (project.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own projects');
    }

    await this.projectRepository.update(id, projectData);
    return this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const project = await this.findOne(id);

    if (project.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own projects');
    }

    await this.projectRepository.delete(id);
  }

  async incrementViews(id: string): Promise<void> {
    await this.projectRepository.increment({ id }, 'views', 1);
  }

  async incrementLoves(id: string): Promise<void> {
    await this.projectRepository.increment({ id }, 'loves', 1);
  }

  async incrementFavorites(id: string): Promise<void> {
    await this.projectRepository.increment({ id }, 'favorites', 1);
  }
}
