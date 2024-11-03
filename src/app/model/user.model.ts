import {last} from 'rxjs';
import {Order} from './order.model';

export enum UserType{
  Admin = "Admin",
  OrderProcessor = "Order Processor",
  Customer = "Customer"
}

export class User {
    id?: number;
    firstName: string;
    lastName: string;
    address: string;
    birthday: Date
    email: string;
    phone: string;
    password: string;
    type: UserType;
    checked: boolean;

    constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType, checked: boolean){
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.birthday = birthday;
      this.email = email;
      this.phone = phone;
      this.password = password;
      this.type = type;
      this.checked = checked;
    }
}

export class Admin extends User{
    adminRole: string;

    constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType, checked: boolean, adminRole: string) {
      super(firstName, lastName, address, birthday, email, phone, password, type, checked);
      this.adminRole = adminRole;
    }
}

export class OrderProcessor extends User{
  workingOnOrders: Order[];
  finishedOrders: Order[];
  processingArea: string;
  shift: string;

  constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType, checked: boolean, workingOnOrders: Order[], finishedOrders: Order[], processingArea: string, shift: string) {
    super(firstName, lastName, address, birthday, email, phone, password, type, checked);
    this.workingOnOrders = workingOnOrders;
    this.finishedOrders = finishedOrders;
    this.processingArea = processingArea;
    this.shift = shift;
  }
}

export class Customer extends User{
  allOrders: Order[];

  constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType, checked: boolean, allOrders: Order[]) {
    super(firstName, lastName, address, birthday, email, phone, password, type, checked);
    this.allOrders = allOrders;
  }
}
