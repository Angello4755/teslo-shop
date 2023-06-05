
import { IOrder } from '../entity';

export default interface OrderRepository {
    create(order: IOrder): Promise<IOrder | {}>;
    get(id: string): Promise<IOrder | null>;
    getAll(idUser: string): Promise<IOrder[] | null>;
}