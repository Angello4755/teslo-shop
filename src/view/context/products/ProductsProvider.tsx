import React, { FC, ReactElement, useReducer } from 'react';
import { ProviderProducts } from 'src/infra/provider/providerProducts';
import { ProductsContext } from './ProductsContext';
import { productsReducer } from './productsReducer';


export interface ProductsState {
}

const Products_INITIAL_STATE: ProductsState = {
};

interface Props {
children: ReactElement;
}

export const ProductsProvider: FC<Props> = ({ children }) => {
const provider = new ProviderProducts();
const [state, dispatch] = useReducer(productsReducer, Products_INITIAL_STATE)

 return (
   <ProductsContext.Provider value={{...state, provider }}>
     {children}
   </ProductsContext.Provider>
 );
};