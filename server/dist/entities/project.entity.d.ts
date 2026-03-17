import { User } from './user.entity';
export declare class Project {
    id: string;
    name: string;
    description: string;
    data: any;
    isPublic: boolean;
    thumbnail: string;
    views: number;
    loves: number;
    favorites: number;
    parentId: string;
    owner: User;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}
