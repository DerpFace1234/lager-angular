import {Component} from './component.model';

export class Supplier{
  id?: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  suppliedComponents: Component[];

  constructor(name: string, address: string, email: string, phone: string, suppliedComponents: Component[]){
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.suppliedComponents = suppliedComponents;
  }
}
