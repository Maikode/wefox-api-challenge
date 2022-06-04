import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserCredentialsError } from '../domain/exceptions/user_credentials_error';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user_repository';

export class LoginUseCase {
    user_repository: UserRepository;

    constructor(dependencies: { userRepository: UserRepository }) {
        this.user_repository = dependencies.userRepository;
    }

    login = async (email: string, password: string): Promise<object> => {
        const user: User | null = await this.user_repository.findOne(email);
        if (!user) {
            throw new UserCredentialsError();
        }
        const checkPassword = await this.compare_password(password, user.password);
        if (!checkPassword) {
            throw new UserCredentialsError();
        }
        const secret = process.env.JWT_SECRET || 'default-secret';
        const expires = `${process.env.JWT_EXPIRES_IN}h`;
        var token = jwt.sign(
            {
                id: user.id,
                email: email
            },
            secret,
            { expiresIn: '1m' }
        );
        return {
            access_token: token,
            expires_in: expires
        };
    };

    private async compare_password(password_plain: string, password_hash: string) {
        return await compare(password_plain, password_hash);
    }
}
