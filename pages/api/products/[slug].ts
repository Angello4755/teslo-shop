import type { NextApiRequest, NextApiResponse } from 'next'
import * as mongoDB from '../../../src/infra/database/mongoDB';
import Product from 'src/infra/database/products/models/Product';
import  { Product as IProduct } from 'src/core/product/entity/Products';

type Data = | {
    message: string;
} | IProduct;

export default function Handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res);
        default:
            return res.status(400).json({ message: 'Bad request!' })
    }  
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await mongoDB.connect();
    const { slug } = req.query;
    const product = await Product.findOne({slug}).lean();
    product.images = getImages(product.images);
    await mongoDB.disconnect();
    if(!product) return res.status(404).json({ message: 'producto no encontrado'})
    return res.status(200).json(product);
}

const getImages = (images: string[]) => {
    return  images.map( image => {
        return image.includes("https") ? image: `${process.env.HOST_NAME}products/${image}`
    });
}