import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        username: string;
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: Partial<import("../../entities").User>;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: Partial<import("../../entities").User>;
    }>;
}
