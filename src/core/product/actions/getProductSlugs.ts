import { ProductSlug } from "../entity";
import ProductRepository from "../repository/ProductRepository";

export class GetProductSlugs {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

   async execute (): Promise<ProductSlug[]>  {
      return this.productRepository.GetProductSlugs();
   }

}