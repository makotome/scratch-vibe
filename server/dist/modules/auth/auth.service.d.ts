import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(username: string, email: string, password: string): Promise<{
        accessToken: string;
        user: Partial<User>;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: Partial<User>;
    }>;
    validateUser(userId: string): Promise<User | null>;
}
