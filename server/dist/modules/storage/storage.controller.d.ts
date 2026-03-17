import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
    }>;
    uploadFiles(files: Express.Multer.File[]): Promise<{
        url: string;
        filename: string;
    }[]>;
}
