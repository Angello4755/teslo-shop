import type { NextApiRequest, NextApiResponse } from 'next'
import * as mongoDB from '../../../src/infra/database/mongoDB';
import Product from 'src/infra/database/products/models/Product';
import { isValidObjectId } from 'mongoose';
import Order from 'src/infra/database/Order/models/Order';
import { IOrder } from 'src/core/product/entity';

type Data = {
    message: string
} | IOrder;

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getOrder(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    }
}

const  getOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } =  req.query;

    if( !isValidObjectId(id)) return res.status(400).json({ message: 'Error' });
    await mongoDB.connect();
    if(!mongoDB) return res.status(400).json({ message: 'Error' });;
    try {
        const order = await Order.findById(id);
        
        await mongoDB.disconnect();
        if(!order) {
            return res.status(400).json({ message: 'Error' });
        }
        return res.status(400).json(order);
    } catch (error) {
        return res.status(400).json({ message: 'Error' })
    }
}
