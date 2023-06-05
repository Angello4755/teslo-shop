import { ICartProduct } from "src/core/product/entity/cart";
import {
  CartSummary,
  ShippingAddres,
} from "src/core/product/entity/cartSummary";
import { CartState } from "./CartProvider";

type CartActionType =
  | { type: "Cart - LoadCart from cookies | storage"; payload: ICartProduct[] }
  | { type: "Cart - Update Products in cart"; payload: ICartProduct[] }
  | {
      type: "[Cart]- Update order summary";
      payload: CartSummary;
    }
  | { type: "Cart - LoadAddress From Cookies"; payload: ShippingAddres }
  | { type: "Cart -Update Address"; payload: ShippingAddres }
  | { type: "Cart - Order complete" };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - Update Products in cart":
      return {
        ...state,
        cart: [...action.payload],
        quantityProducts: action.payload.length,
      };
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
        cart: [...action.payload],
        isLoaded: true,
        quantityProducts: action.payload.length,
      };
    case "[Cart]- Update order summary":
      return {
        ...state,
        cartSummary: action.payload,
      };
    case "Cart - LoadAddress From Cookies":
      return {
        ...state,
        cartSummary: {
          ...state.cartSummary,
          shippingAddres: action.payload,
        },
      };
    case "Cart -Update Address":
      return {
        ...state,
        cartSummary: {
          ...state.cartSummary,
          shippingAddres: action.payload,
        },
      };
    case "Cart - Order complete":
      return {
        ...state,
        cart: [],
        quantityProducts: 0,
        cartSummary: {
          numberOfItems: 0,
          subTotal: 0,
          tax: 0,
          total: 0,
          taxRate: 0,
        },
      };
    default:
      return state;
  }
};
