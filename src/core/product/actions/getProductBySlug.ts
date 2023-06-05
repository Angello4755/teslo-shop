import ProductRepository from 'src/core/product/repository/ProductRepository';
import { Product } from '../entity';

export default class GetProductBySlug {

    private productsRepository: ProductRepository

    constructor(productsRepository: ProductRepository ) {
      this.productsRepository = productsRepository;
    }

    async execute(slug: string): Promise<Product> {
        return this.productsRepository.getProductBySlug(slug);    
    }
}