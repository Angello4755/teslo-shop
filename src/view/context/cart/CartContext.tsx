import { createContext } from "react";
import { ICartProduct } from "src/core/product/entity/cart";
import {
  CartSummary,
  ShippingAddres,
} from "src/core/product/entity/cartSummary";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  addProductCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeProductInCart: (product: ICartProduct) => void;
  getAllProductCart: () => ICartProduct[];
  updateAddress: (shippingAddres: ShippingAddres) => void;
  quantityProducts: number;
  cartSummary: CartSummary;
  createOrder: () => Promise< { hasError: boolean; message: string}>;
}

export const CartContext = createContext({} as ContextProps);
