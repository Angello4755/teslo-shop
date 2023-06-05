import type { NextApiRequest, NextApiResponse } from 'next';
import { initialData } from 'src/infra/database/products/seed-data';
import Product from '../../src/infra/database/products/models/Product';
import * as mongoDB from '../../src/infra/database/mongoDB'
import User from 'src/infra/database/auth/models/User';
import Order from 'src/infra/database/Order/models/Order';

type Data = {
    message: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if( process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este servicio'});
    }

    await mongoDB.connect();

    await Product.deleteMany();
    await Product.insertMany(initialData.products);
    await User.deleteMany();
    await User.insertMany(initialData.users);
    await Order.deleteMany();
    await mongoDB.disconnect();

    res.status(200).json({ message: 'Conectado correctamente' })
}