import jwt from 'jsonwebtoken';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user_repository';

export class LoginUseCase {
    user_repository: UserRepository;

    constructor(dependencies: { userRepository: UserRepository }) {
        this.user_repository = dependencies.userRepository;
    }

    login = async (email: string, password: string): Promise<any> => {
        const user: User | null = await this.user_repository.findOne(email);
        if (user) {
            if (user.password == password) {
                const secret = process.env.JWT_SECRET || 'default-secret';
                const expires = `${process.env.JWT_EXPIRES_IN}h`;
                var token = jwt.sign(
                    {
                        id: user.id,
                        email: email
                    },
                    secret,
                    { expiresIn: expires }
                );
                return {
                    accestoken: token,
                    expires: expires
                };
            } else {
                console.log('Credenciales INVÁLIDAS');
            }
        } else {
            console.log('No existe el user');
        }
    };
}
