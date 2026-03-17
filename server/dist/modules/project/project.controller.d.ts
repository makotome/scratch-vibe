import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    findAll(userId?: string): Promise<import("../../entities").Project[]>;
    findOne(id: string): Promise<import("../../entities").Project>;
    create(projectData: any, req: any): Promise<import("../../entities").Project>;
    update(id: string, projectData: any, req: any): Promise<import("../../entities").Project>;
    remove(id: string, req: any): Promise<void>;
    love(id: string): Promise<{
        success: boolean;
    }>;
    favorite(id: string): Promise<{
        success: boolean;
    }>;
}
