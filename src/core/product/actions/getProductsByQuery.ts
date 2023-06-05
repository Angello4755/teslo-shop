import ProductRepository from 'src/core/product/repository/ProductRepository';
import { Product } from '../entity';

export default class GetProductsByQuery {

    private productsRepository: ProductRepository

    constructor(productsRepository: ProductRepository ) {
      this.productsRepository = productsRepository;
    }

    async execute(query: string): Promise<Product[]> {
        return this.productsRepository.GetProductsByQuery(query);    
    }
}