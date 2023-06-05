import type { NextApiRequest, NextApiResponse } from 'next'
import Product from 'src/infra/database/products/models/Product';
import  { Product as IProduct } from 'src/core/product/entity/Products';
import * as mongoDB from '../../../src/infra/database/mongoDB';
import { SHOP_CONSTANTS } from 'src/infra/database/products';
type Data = 
|{ message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { gender = 'all'} = req.query;

    let condition = {};
    if(gender !== 'all' && SHOP_CONSTANTS.validGender.includes(`${gender}`)) {
        condition = { gender };
    }
    await mongoDB.connect();
    const products = await Product.find(condition).lean();
    const updateProducts = products.map( product => {
        product.images = getImages(product.images);
        return product;
    });
    await mongoDB.disconnect();
    return res.status(200).json(updateProducts)
}

const getImages = (images: string[]) => {
    return  images.map( image => {
        return image.includes("https") ? image: `${process.env.HOST_NAME}products/${image}`
    });
}
