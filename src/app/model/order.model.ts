import {Customer, OrderProcessor, User} from './user.model';
import {Components} from './component.model';

export class Order{
  id?: number;
  orderDateTime: Date;
  customer: Customer;
  status: string;
  components: Map<Components, number>;
  price: number;
  processor: OrderProcessor;

  constructor(orderDateTime: Date, customer: Customer, status: string, components: Map<Components, number>, price: number, processor: OrderProcessor) {
    this.orderDateTime = orderDateTime;
    this.customer = customer;
    this.status = status;
    this.components = components;
    this.price = price;
    this.processor = processor;
  }
}
