import {last} from 'rxjs';

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


    constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string){
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.department = department;
      this.birthday = birthday;
      this.email = email;
      this.phone = phone;
      this.password = password;
    }
}

export class Admin extends User{
    adminRole: string;

    constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string, adminRole: string) {
      super(firstName, lastName, address, department, birthday, email, phone, password);
      this.adminRole = adminRole;
    }
}

export class OrderProcessor extends User{
  processingArea: string;
  shift: string;

  constructor(firstName:string, lastName:string, address:string, department:string, birthday:Date, email:string, phone: string, password: string, processingArea: string, shift: string) {
    super(firstName, lastName, address, department, birthday, email, phone, password);
    this.processingArea = processingArea;
    this.shift = shift;
  }
}
