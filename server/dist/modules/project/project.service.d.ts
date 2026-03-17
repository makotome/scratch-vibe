import { Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';
export declare class ProjectService {
    private projectRepository;
    constructor(projectRepository: Repository<Project>);
    findAll(): Promise<Project[]>;
    findByUser(userId: string): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    create(projectData: Partial<Project>, userId: string): Promise<Project>;
    update(id: string, projectData: Partial<Project>, userId: string): Promise<Project>;
    remove(id: string, userId: string): Promise<void>;
    incrementViews(id: string): Promise<void>;
    incrementLoves(id: string): Promise<void>;
    incrementFavorites(id: string): Promise<void>;
}
