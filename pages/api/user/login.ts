import { DoorBack } from '@mui/icons-material';
import { decodeBase64 } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import User from 'src/infra/database/auth/models/User';
import * as mongoDB from '../../../src/infra/database/mongoDB';
import bcrypt from 'bcryptjs';
import { jwt } from 'utils';

type Data = {
    message: string
} | { token: string, user: { email: string, name: string, role: string } };

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return loginUser(req, res);
        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '' } = req.body;

    await mongoDB.connect();

    const user = await User.findOne({ email });

    await mongoDB.disconnect();

    if (!user)  {
        return res.status(400).json({ message: 'Correo o contraseña no validos - EMAIL'});
    }

    if( !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Correo o contraseña no validos - Password'});
    }

    const { role, name } = user;

    const token = jwt.signToken(user.id, user.email);

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    });

}
