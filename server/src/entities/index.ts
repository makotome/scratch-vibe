import { User } from './user.entity';
import { Project } from './project.entity';

export * from './user.entity';
export * from './project.entity';

export const entities = [User, Project];
