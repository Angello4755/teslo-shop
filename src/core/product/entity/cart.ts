import { Size, Types } from "./Products";

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: Size;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}