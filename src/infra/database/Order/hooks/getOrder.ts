import { isValidObjectId } from "mongoose";
import { IOrder } from "src/core/product/entity";
import * as mongoDB from '../../mongoDB';
import Order from "../models/Order";

export const getOrder = async (id: string) : Promise<IOrder | null> => {
   
    if( !isValidObjectId(id)) return null;
    await mongoDB.connect();
    if(!mongoDB) return null;
    try {
        const order = await Order.findById(id).lean();
        await mongoDB.disconnect();
    
        if(!order) {
            return null;
        }
        return JSON.parse( JSON.stringify(order))
    } catch (error) {
        return null
    }

}