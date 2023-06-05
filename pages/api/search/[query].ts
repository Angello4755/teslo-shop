import type { NextApiRequest, NextApiResponse } from 'next'
import  { Product as IProduct } from 'src/core/product/entity/Products';
import * as mongoDB from '../../../src/infra/database/mongoDB';
import Product from 'src/infra/database/products/models/Product';

type Data = {
    message: string
} | IProduct[];

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return searchProducts(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let { query = '' } = req.query;

    if(query.length === 0 ) {
        res.status(400).json({ message: 'Debe especificar el query de busqueda'})
    }

    query = query.toString().toLowerCase();

    await mongoDB.connect();
    const products = await Product.find({
        $text: { $search: query}
    }).select('title images price inStok slug -_id').lean();
    await mongoDB.disconnect();
    
    if (!products) return res.status(400).json({ message: 'No se encontraron productos'})
    return res.status(200).json(products)
}
