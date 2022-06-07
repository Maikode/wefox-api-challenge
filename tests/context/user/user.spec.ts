import { hash } from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { LoginUseCase } from '../../../src/context/user/application/login_use_case';
import { UserCredentialsError } from '../../../src/context/user/domain/exceptions/user_credentials_error';
import { User } from '../../../src/context/user/domain/user';
import { UserRepositoryMocked } from './__mocks__/user_repository_mock';
describe('User context testing', () => {
    let user_repository_mocked: UserRepositoryMocked;
    let login_use_case: LoginUseCase;

    //Use default dev env file as test env
    config({
        path: `${process.cwd()}/env/dev.env`
    });

    beforeEach(() => {
        user_repository_mocked = new UserRepositoryMocked();
        login_use_case = new LoginUseCase({ userRepository: user_repository_mocked });
    });

    it('Create correct User model', () => {
        const user = new User('id_12345', 'email@example.com', 'password123');
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBeDefined();
        expect(user.password).toBeDefined();
        expect(user.email).toEqual('email@example.com');
        expect(user.password).toEqual('password123');
    });

    it('User login succesfully with and exists user', async () => {
        //Create an user with values
        const id = 'id_12345';
        const email = 'user@example.com';
        const password_plain = 'password1234';
        const password_hashed = await hash(password_plain, 10);
        const user_to_return = new User(id, email, password_hashed);

        //Set an user to return from user repository
        user_repository_mocked.findOneReturnUser(user_to_return);

        //Call login use case method
        const result: any = await login_use_case.login(email, password_plain);

        //Check auth token values
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
        expect(result.expires_in).toBeDefined();
        expect(result.access_token).toBeDefined();

        //Verify token payload and expiration
        const payload: any = jwt.verify(result.access_token, process.env.JWT_SECRET as string) as {};

        expect(payload.id).toEqual('id_12345');
        expect(payload.email).toEqual('user@example.com');
    });

    it('User login not succesfully with an unregistered email', async () => {
        //Set null value to return from user repository
        user_repository_mocked.findOneReturnUser(null);

        //Check a domain expection with user credentials error
        await expect(login_use_case.login('user', 'password')).rejects.toThrow(UserCredentialsError);
    });

    it('User login not succesfully with and exits user but wrong password', async () => {
        //Create an user with values
        const id = 'id_12345';
        const email = 'user@example.com';
        const password_plain = 'password1234';
        const password_hashed = await hash(password_plain, 10);
        const user_to_return = new User(id, email, password_hashed);

        //Set an user to return from user repository
        user_repository_mocked.findOneReturnUser(user_to_return);

        //Check a domain expection with user credentials error
        await expect(login_use_case.login(email, 'wrong_password')).rejects.toThrow(UserCredentialsError);
    });
});
