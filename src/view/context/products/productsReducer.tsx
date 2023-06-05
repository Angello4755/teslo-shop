import { ProductsState } from './ProductsProvider';

type productsActionType =
| { type: 'pen' };

export const productsReducer = (state: ProductsState, action: productsActionType): ProductsState => {
switch (action.type) {
case 'pen':
return {
...state
};
default:
return state;
}
};