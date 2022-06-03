import { User } from './user';

export interface UserRepository {
    findOne(email: string): Promise<User | null>;
}
