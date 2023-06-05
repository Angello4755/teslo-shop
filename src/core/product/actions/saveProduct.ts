import { ProductSlug } from "../entity";
import ProductRepository from "../repository/ProductRepository";
import { Product } from 'src/core/product/entity/Products';

export class SaveProduct {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

   async execute (product: Product): Promise<string>  {
      return this.productRepository.save(product);
   }

}