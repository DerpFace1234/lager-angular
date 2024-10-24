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
