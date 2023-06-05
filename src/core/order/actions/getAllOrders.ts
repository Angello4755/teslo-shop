import OrderRepository from 'src/core/product/repository/OrderRepository';
import { IOrder } from '../entity/order';

export default class GetAllOrders {

    private orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
      this.orderRepository = orderRepository;
    }

    async execute(idUser: string): Promise<IOrder[] | null> {
        return this.orderRepository.getAll(idUser);    
    }
}