import type { NextApiRequest, NextApiResponse } from 'next'
import * as mongoDB from '../../../src/infra/database/mongoDB';
import User from 'src/infra/database/auth/models/User';
import { IUser } from '../../../src/core/product/entity/user';
import { isValidObjectId } from 'mongoose';
type Data = {
    message: string;
} | IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getUsers(req, res);
        case 'PUT':
            return updateUser(req, res);
        default:
            return res.status(200).json({message: 'Correct'});
    }
}

const getUsers =  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await mongoDB.connect();
    const users = await User.find().select('-password').lean();
    await mongoDB.disconnect();

    return res.status(200).json(users);

}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId = '', role = ''} = req.body;

    if( !isValidObjectId(userId)) return res.status(400).json({message: 'userId invalido'});

    const validRoles = [ 'admin', 'super-user', 'SEO', 'client'];

    if(!validRoles.includes(role)) return res.status(400).json({message: 'Role no esta permitido'});
    
    await mongoDB.connect()
    const user = await User.findById(userId);

    if(!user) {
        await mongoDB.disconnect();
        return res.status(400).json({message: 'usuario no encontrado'});
    }
    user.role = role;
    await user.save();
    await mongoDB.disconnect();

    res.status(200).json({message: 'Usuario actualizado'});
}

