import type { NextApiRequest, NextApiResponse } from 'next'
import User from 'src/infra/database/auth/models/User';
import Order from 'src/infra/database/Order/models/Order';
import { Product } from 'src/infra/database/products';
import * as mongoDB from '../../../src/infra/database/mongoDB';

type Data = {
   numberOfOrders: number;
   paidOrders: number;
   notpaidOrders: number;
   numberOfClients: number;
   numberOfProducts: number;
   productsWithNoInventory: number;
   lowInventory: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const data = getNumberOfOrders(req, res);

}

const getNumberOfOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await mongoDB.connect();
    const [
        numberOfOrders,
        paidOrders,
        notpaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true}).count(),
        Order.find({ isPaid: false}).count(),
        User.find({role: 'client'}).count(),
        Product.count(),
        Product.find({ inStock: 0}).count(),
        Product.find({ inStock: {$lte: 10}}).count(),
    ]);
    await mongoDB.disconnect();
    return res.status(200).json({ 
        numberOfOrders,
        paidOrders,
        notpaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
     });

}