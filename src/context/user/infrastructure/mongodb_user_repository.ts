import { connect } from 'mongoose';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user_repository';
import { userModel } from './databases/mongodb/schemas/user_schema';

export class MongoDBUserRepository implements UserRepository {
    constructor() {
        const url: string = process.env.MONGODB_URL || '';
        connect(url, { dbName: process.env.MONGODB_DATABASE })
            .then(() => {
                console.log('[*] MongoDB Connected');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async findOne(email: string): Promise<User | null> {
        const user = (await userModel.findOne({ email: email })) || null;
        return user
            ? new User(user._id.toString(), user.email, user.password)
            : null;
    }
}
