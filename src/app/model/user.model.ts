import {Order} from './order.model';

export enum UserType{
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  ORDER_PROCESSOR = "ORDER_PROCESSOR"
}

export class User {
    id?: number;
    firstName: string;
    lastName: string;
    address: string;
    birthday: Date;
    email: string;
    phone: string;
    password: string;
    type: UserType;

    constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType){
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.birthday = birthday;
      this.email = email;
      this.phone = phone;
      this.password = password;
      this.type = type;
    }
}

export class Admin extends User{
    adminRole: string;

    constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType, adminRole: string) {
      super(firstName, lastName, address, birthday, email, phone, password, type);
      this.adminRole = adminRole;
    }
}

export class OrderProcessor extends User{
  processingArea: string;
  shift: string;

  constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType, processingArea: string, shift: string) {
    super(firstName, lastName, address, birthday, email, phone, password, type);
    this.processingArea = processingArea;
    this.shift = shift;
  }
}

export class Customer extends User{

  constructor(firstName:string, lastName:string, address:string, birthday:Date, email:string, phone: string, password: string, type: UserType) {
    super(firstName, lastName, address, birthday, email, phone, password, type);
  }
}
