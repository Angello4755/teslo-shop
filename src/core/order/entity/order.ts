import { IUser, Size } from '../../product/entity';
import { CartSummary } from '../../product/entity/cartSummary';
export interface IOrder {
    _id?           : string;
    user?         : IUser | string;
    orderItems    : IOrderItem[],
    cartSummary?  : CartSummary;
    paymentResult?: string;
    isPaid        : boolean;
    paidAt?       : string;

    transactionId?: string;

    createdAt?: string;
    updatedAt?: string;

}

export interface IOrderItem {
    _id     : string;
    image   : string;
    title   : string;
    size    : Size;
    quantity: number;
    slug    : string;
    price   : number;
    gender  : 'men'|'women'|'kid'|'unisex';    
}