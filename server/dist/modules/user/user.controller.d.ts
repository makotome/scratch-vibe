import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("../../entities").User[]>;
    findOne(id: string): Promise<import("../../entities").User>;
}
