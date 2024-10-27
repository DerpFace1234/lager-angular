import {Component} from './component.model';

export class Return{
  id?: number;
  returned: Component;
  timeReturned: Date;
  quantity: number;
  reason: string;

  constructor(returned: Component, timeReturned: Date, quantity: number, reason: string){
    this.returned = returned;
    this.timeReturned = timeReturned;
    this.quantity = quantity;
    this.reason = reason;
  }
}
