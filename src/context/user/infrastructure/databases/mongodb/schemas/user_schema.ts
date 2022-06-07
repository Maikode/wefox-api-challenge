import { Document, model, Schema } from 'mongoose';
import { User } from '../../../../domain/user';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const userModel = model<User & Document>('users', userSchema);
