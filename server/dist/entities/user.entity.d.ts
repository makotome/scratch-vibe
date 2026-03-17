import { Project } from './project.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    projects: Project[];
}
