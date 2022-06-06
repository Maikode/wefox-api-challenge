import 'jest';
import { User } from '../../../../src/context/user/domain/user';
import { UserRepository } from '../../../../src/context/user/domain/user_repository';

export class UserRepositoryMocked implements UserRepository {
    findOneMocked = jest.fn();
    async findOne(email: string): Promise<User | null> {
        return await this.findOneMocked();
    }

    findOneReturnUser = (userMocked: User | null) => {
        return this.findOneMocked.mockReturnValue(userMocked);
    };
}
