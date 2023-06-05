import React, { FC, ReactElement, useEffect, useReducer } from "react";
import { ICartProduct } from "../../../core/product/entity/cart";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";
import Cookie from "js-cookie";
import { CartSummary } from "src/core/product/entity/cartSummary";
import { getAddressFromCookies, saveAddressInCookies } from "utils";
import { IOrder, ShippingAddres } from "src/core/product/entity";
import CreateOrder from "src/core/order/actions/createOrder";
import RepositoryOrdersInMongo from "../../../infra/database/Order/repository/RepositoryOrdersInMongo";

export interface CartState {
  cart: ICartProduct[];
  quantityProducts: number;
  cartSummary: CartSummary;
  isLoaded: boolean;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  quantityProducts: 0,
  cartSummary: {
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    taxRate: 0,
    shippingAddres: undefined,
  },
};

interface Props {
  children: ReactElement;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "Cart - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "Cart - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const tax = subTotal * taxRate;
    const total = Number((subTotal * (taxRate + 1)).toFixed(2));

    const cartSummary = {
      numberOfItems,
      subTotal,
      tax,
      total,
      taxRate,
      shippingAddres: state.cartSummary.shippingAddres,
    };

    dispatch({ type: "[Cart]- Update order summary", payload: cartSummary });
  }, [state.cart]);

  useEffect(() => {
    const shippingAddres = getAddressFromCookies();

    dispatch({
      type: "Cart - LoadAddress From Cookies",
      payload: shippingAddres,
    });
  }, []);

  const updateAddress = (shippingAddres: ShippingAddres) => {
    saveAddressInCookies(shippingAddres);
    dispatch({
      type: "Cart -Update Address",
      payload: shippingAddres,
    });
  };

  const addProductCart = (product: ICartProduct) => {
    // dispatch({ type: 'Cart - Update Products in cart', payload: product });

    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!productInCart)
      return dispatch({
        type: "Cart - Update Products in cart",
        payload: [...state.cart, product],
      });

    const productChange = state.cart.filter(
      (p) => p._id === product._id && p.size === product.size
    )[0];

    productChange.quantity += product.quantity;

    return dispatch({
      type: "Cart - Update Products in cart",
      payload: state.cart,
    });
  };
  const getAllProductCart = () => {
    return state.cart;
  };

  const actionCreateOrder = new CreateOrder(new RepositoryOrdersInMongo());

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.cartSummary.shippingAddres) {
      throw new Error("No hay direccion de entrega");
    }

    try {
      const newOrder: IOrder = {
        orderItems: state.cart.map((p) => ({
          ...p,
          size: p.size!,
        })),
        cartSummary: state.cartSummary,
        isPaid: false,
      };
      const order: IOrder | any = await actionCreateOrder.execute(newOrder);
      if (!order.error) {
        dispatch({ type: "Cart - Order complete" });
      }
      return {
        hasError: order.error ? true : false,
        message: order._id || order.error,
      };
    } catch (error) {
      return {
        hasError: true,
        message: "error",
      };
    }
  };

  const updateCartQuantity = (product: ICartProduct) => {
    const productChange = state.cart.filter(
      (p) => p._id === product._id && p.size === product.size
    )[0];
    productChange.quantity = product.quantity;
    return dispatch({
      type: "Cart - Update Products in cart",
      payload: state.cart,
    });
  };

  const removeProductInCart = (product: ICartProduct) => {
    const products = state.cart.filter(
      (p) => !(p._id === product._id && p.size === product.size)
    );
    return dispatch({
      type: "Cart - Update Products in cart",
      payload: products,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductCart,
        getAllProductCart,
        updateCartQuantity,
        removeProductInCart,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
