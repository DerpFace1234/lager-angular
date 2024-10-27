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
    department: string;
    birthday: Date
    email: string;
    phone: string;
    password: string;
    type: UserType;

    constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string, type: UserType){
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.department = department;
      this.birthday = birthday;
      this.email = email;
      this.phone = phone;
      this.password = password;
      this.type = type;
    }
}

export class Admin extends User{
    adminRole: string;

    constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string, type: UserType, adminRole: string) {
      super(firstName, lastName, address, department, birthday, email, phone, password, type);
      this.adminRole = adminRole;
    }
}

export class OrderProcessor extends User{
  workingOnOrders: Order[];
  finishedOrders: Order[];
  processingArea: string;
  shift: string;

  constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string, type: UserType, workingOnOrders: Order[], finishedOrders: Order[], processingArea: string, shift: string) {
    super(firstName, lastName, address, department, birthday, email, phone, password, type);
    this.workingOnOrders = workingOnOrders;
    this.finishedOrders = finishedOrders;
    this.processingArea = processingArea;
    this.shift = shift;
  }
}

export class Customer extends User{
  allOrders: Order[];

  constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string, type: UserType, allOrders: Order[]) {
    super(firstName, lastName, address, department, birthday, email, phone, password, type);
    this.allOrders = allOrders;
  }
}
