import GetAllProducts from 'src/core/product/actions/getAllProducts';
import GetProductBySlug from 'src/core/product/actions/getProductBySlug';
import GetProductsByQuery from 'src/core/product/actions/getProductsByQuery';
import { GetProductSlugs } from 'src/core/product/actions/getProductSlugs';
import OAUthToDbUser from 'src/core/product/actions/oAUthToDbUser';
import { SaveProduct } from 'src/core/product/actions/saveProduct';
import ProductRepository from '../../core/product/repository/ProductRepository';
import RepositoryProductsInMongo from '../database/products/repository/RepositoryProductsInMongo';
export class ProviderProducts {

    private repo: ProductRepository;


    constructor() {
        this.repo = new RepositoryProductsInMongo;
    }

    get_GetProductBySlug(): GetProductBySlug {
        return new GetProductBySlug(this.repo);
    }

    get_GetProductSlugs(): GetProductSlugs {
        return new GetProductSlugs(this.repo);
    }

    get_GetProductsByQuery(): GetProductsByQuery {
        return new GetProductsByQuery(this.repo);
    }

    get_GetAllProducts(): GetAllProducts {
        return new GetAllProducts(this.repo);
    }

    get_OAUthToDbUser() : OAUthToDbUser {
        return new OAUthToDbUser();
    }

    get_SaveProduct() : SaveProduct {
        return new SaveProduct(this.repo);
    }
}