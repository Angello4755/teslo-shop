import * as mongoDB from '../../mongoDB';
import bcrypt from 'bcryptjs';
import { jwt } from 'utils';
import User from '../models/User';

export const checkUserEmailPassword = async (email: string, password: string) => {
    await mongoDB.connect();
            const user = await User.findOne({ email });
            await mongoDB.disconnect();
            if (!user)  {
                return Promise.resolve({ error: 'error'});
            }

            if( !bcrypt.compareSync(password, user.password)) {
                return Promise.resolve({ error: 'error'});;
            }

            const { role, name } = user;
            const token = jwt.signToken(user.id, user.email);
            return { 
                token, 
                user: {
                     email, role, name
                }
            };

}