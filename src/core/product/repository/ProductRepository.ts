import { Product, ProductSlug } from "../entity";


export default interface ProductRepository {
    save(product: Product): PromiseLike<string>;
    GetAllProducts(): Promise<Product[]>;
    getProductsByGender(gender: string): Promise<Product[]>;
    getProductBySlug(slug: string): Promise<Product>;
    GetProductSlugs(): Promise<ProductSlug[]>;
    GetProductsByQuery(query: string): Promise<Product[]>;
}