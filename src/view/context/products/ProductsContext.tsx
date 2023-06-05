import { createContext } from 'react';
import { ProviderProducts } from 'src/infra/provider/providerProducts';

interface ContextProps {
    provider: ProviderProducts;
}

export const ProductsContext = createContext({} as ContextProps);