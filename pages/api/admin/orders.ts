import type { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from 'src/core/product/entity';
import Order from 'src/infra/database/Order/models/Order';
import * as mongoDB from '../../../src/infra/database/mongoDB';

type Data = {
    message: string
} | IOrder[]
 
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getOrders(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' });            
    }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
     await mongoDB.connect();
     const orders = await Order.find().sort({ createdAt: 'desc'}).populate('user', 'name email').lean();
     await mongoDB.disconnect();     
     return res.status(200).json( orders);
}
