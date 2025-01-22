
export class OrderMiddleman {
  orderDateTime: Date;
  customerId?: number;
  status: string;
  components: {[key: string]: number};
  price: number;
  processorId?: number;

  constructor(orderDateTime: Date, customer: number | undefined, status: string, components: {[key: string]: number}, price: number, processor: number | undefined) {
    this.orderDateTime = orderDateTime;
    this.customerId = customer;
    this.status = status;
    this.components = components;
    this.price = price;
    this.processorId = processor;
  }
}
