import { isValidObjectId } from "mongoose";
import { IOrder } from "src/core/product/entity";
import * as mongoDB from '../../mongoDB';
import Order from "../models/Order";

export const getAllOrders = async (idUser: string) : Promise<IOrder[] | null> => {
    if( !isValidObjectId(idUser)) return null;
    await mongoDB.connect();
    if(!mongoDB) return null;
    try {
        const orders = await Order.find({ user: idUser}).lean();
        await mongoDB.disconnect();
        if(!orders) {
            return null;
        }
        return JSON.parse( JSON.stringify(orders))
    } catch (error) {
        return null
    }

}