import { DoorBack } from '@mui/icons-material';
import { decodeBase64 } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next'
import User from 'src/infra/database/auth/models/User';
import * as mongoDB from '../../../src/infra/database/mongoDB';
import bcrypt from 'bcryptjs';
import { jwt } from 'utils';

type Data = {
    message: string
} | { token: string, user: { email: string, name: string, role: string}};

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return checkToken(req, res);
        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const checkToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies;

    let userId = ''

    try {
        userId = await jwt.isValidToken(token);
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalido'
        }) 
    }

    await mongoDB.connect();

    const user = await User.findById( userId).lean();

   await mongoDB.disconnect();

   if(!user) {
    return res.status(400).json({
        message: 'No existe el usuario'
    }) 
   }

   const { _id, email, role, name} = user;

    return res.status(200).json({
        token: jwt.signToken(_id, email),
        user: {
            email, role, name
        }
    });

}
