export declare class StorageService {
    private uploadDir;
    constructor();
    private ensureUploadDir;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
    }>;
    deleteFile(filename: string): Promise<void>;
    getFilePath(filename: string): string;
}
