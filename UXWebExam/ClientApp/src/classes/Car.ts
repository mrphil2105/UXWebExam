export class Car {
    public name: string;
    public price: number;
    public type: Type;
    public imageURL: string;
  
  
    constructor(name: string ,price:number,type:Type,imageURL:string) {
      this.name = name;
      this.price = price;
      this.type = type;
      this.imageURL = imageURL;
    }

 
}

export enum Type {
  Electric = "Electric",
  Petrol = "Petrol",
  Diesel = "Diesel"
}