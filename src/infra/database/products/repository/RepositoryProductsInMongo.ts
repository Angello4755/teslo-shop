import { Product as ProductI, ProductSlug } from 'src/core/product/entity';
import ProductRepository from '../../../../core/product/repository/ProductRepository';
import * as mongoDB from '../../mongoDB';
import Product from '../models/Product';
import productsApi from '../../../api/productsApi';

export default class RepositoryProductsInMongo implements ProductRepository {
    async save(product: ProductI): Promise<string> {
        try {
            const result = await productsApi({
                url: `/admin/products/`,
                method: product._id ? 'PUT': 'POST',
                data: product
            });
            return Promise.resolve('Actualizado Correctamente');
        } catch(error) {
            return Promise.resolve('Error al guardar');
        }
    }
    async GetAllProducts(): Promise<ProductI[]> {
        await mongoDB.connect();
        const products = await Product.find().lean();
        const updateProducts = products.map( product => {
            product.images = this.getImages(product.images);
            return product;
        });
        await mongoDB.disconnect();
        return Promise.resolve(JSON.parse(JSON.stringify(updateProducts)));
    }
    async GetProductsByQuery(query: string): Promise<ProductI[]> {
        await mongoDB.connect();
        const products = await Product.find({
            $text: { $search: query}
        }).select('title images price inStok slug -_id').lean();
        const updateProducts = products.map( product => {
            product.images = this.getImages(product.images);
            return product;
        });
        await mongoDB.disconnect();
        return Promise.resolve(updateProducts);
    }
    async GetProductSlugs(): Promise<ProductSlug[]> {
            await mongoDB.connect();
            const slugs = Product.find().select('slug -_id').lean();
            await mongoDB.disconnect();
            return Promise.resolve(slugs);
    }
    async getProductBySlug(slug: string): Promise<ProductI> {
        let product: ProductI;
        try {
            const { data } = await productsApi.get(`/products/${slug}`);
            product = data;
            product.images = this.getImages(product.images);
            return Promise.resolve(product);
        } catch(error) {
            await mongoDB.connect();
            product = JSON.parse(JSON.stringify(await Product.findOne({slug}).lean()));
            product.images = this.getImages(product.images);
            await mongoDB.disconnect();
            return Promise.resolve(product);
        }
       
    }

    getImages(images: string[]) {
        return  images.map( image => {
            return image.includes("https") ? image: `${process.env.HOST_NAME}products/${image}`
        });
    }

    getProductsByGender(gender: string): Promise<ProductI[]> {
        throw new Error('Method not implemented.');
    }
}