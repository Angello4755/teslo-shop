import OrderRepository from 'src/core/product/repository/OrderRepository';
import { IOrder } from '../entity/order';

export default class CreateOrder {

    private orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
      this.orderRepository = orderRepository;
    }

    async execute(order: IOrder): Promise<IOrder | {}> {
        return this.orderRepository.create(order);    
    }
}