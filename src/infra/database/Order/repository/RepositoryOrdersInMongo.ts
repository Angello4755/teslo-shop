import { IOrder } from "src/core/product/entity";
import OrderRepository from "src/core/product/repository/OrderRepository";
import productsApi from "src/infra/api/productsApi";
import { getAllOrders } from "../hooks/getAllOrders";
import { getOrder } from "../hooks/getOrder";

export default class RepositoryOrdersInMongo implements OrderRepository {
    async getAll(idUser: string): Promise<IOrder[] | null> {
        try {
            const order = await getAllOrders(idUser);
            return Promise.resolve(order);
        } catch (error) {
            return null;
        }   
    }
    async get(id: string): Promise<null | IOrder> {
        try {
            const order = await getOrder(id);
            return Promise.resolve(order);
        } catch (error) {
           
            return null;
        }   
    }
    async create(order: IOrder): Promise<IOrder | { }> {
        try {
            const { data } = await productsApi.post(`/orders`, order);
            return Promise.resolve(data);
        } catch(error: any) {
            const message = error.response.data.message || 'error';
            return Promise.resolve({ error: message });
        }
    }

}