import ProductRepository from 'src/core/product/repository/ProductRepository';
import { Product } from '../entity';

export default class GetAllProducts {

    private productsRepository: ProductRepository

    constructor(productsRepository: ProductRepository ) {
      this.productsRepository = productsRepository;
    }

    async execute(): Promise<Product[]> {
        return this.productsRepository.GetAllProducts();    
    }
}