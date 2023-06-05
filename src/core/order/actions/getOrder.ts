import OrderRepository from 'src/core/product/repository/OrderRepository';
import { IOrder } from '../entity/order';

export default class Getorder {

    private orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
      this.orderRepository = orderRepository;
    }

    async execute(id: string): Promise<IOrder | null> {
        return this.orderRepository.get(id);    
    }
}