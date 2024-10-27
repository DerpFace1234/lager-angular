import {OrderProcessor, User} from './user.model';
import {Component} from './component.model';

export class Order{
  id?: number;
  orderDateTime: Date;
  user: User;
  status: string;
  components: Component[];
  price: number;
  processor: OrderProcessor;

  constructor(orderDateTime: Date, user: User, status: string, components: Component[], price: number, processor: OrderProcessor) {
    this.orderDateTime = orderDateTime;
    this.user = user;
    this.status = status;
    this.components = components;
    this.price = price;
    this.processor = processor;
  }
}
