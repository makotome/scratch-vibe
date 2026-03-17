"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../../entities/project.entity");
let ProjectService = class ProjectService {
    projectRepository;
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async findAll() {
        return this.projectRepository.find({
            where: { isPublic: true },
            relations: ['owner'],
            order: { updatedAt: 'DESC' },
        });
    }
    async findByUser(userId) {
        return this.projectRepository.find({
            where: { ownerId: userId },
            relations: ['owner'],
            order: { updatedAt: 'DESC' },
        });
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async create(projectData, userId) {
        const project = this.projectRepository.create({
            ...projectData,
            ownerId: userId,
        });
        return this.projectRepository.save(project);
    }
    async update(id, projectData, userId) {
        const project = await this.findOne(id);
        if (project.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own projects');
        }
        await this.projectRepository.update(id, projectData);
        return this.findOne(id);
    }
    async remove(id, userId) {
        const project = await this.findOne(id);
        if (project.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own projects');
        }
        await this.projectRepository.delete(id);
    }
    async incrementViews(id) {
        await this.projectRepository.increment({ id }, 'views', 1);
    }
    async incrementLoves(id) {
        await this.projectRepository.increment({ id }, 'loves', 1);
    }
    async incrementFavorites(id) {
        await this.projectRepository.increment({ id }, 'favorites', 1);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map