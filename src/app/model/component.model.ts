export class Component{
  id?: number;
  name: string;
  quantityStock: number;
  price: number;
  reorderQuantity: number;
  image: Uint8Array;

  constructor(name:string, quantityStock: number, price:number, reorderQuantity: number, image: Uint8Array){
    this.name = name;
    this.quantityStock = quantityStock;
    this.price = price;
    this.reorderQuantity = reorderQuantity;
    this.image = image;
  }
}
