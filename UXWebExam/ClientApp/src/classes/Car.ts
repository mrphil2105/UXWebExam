export class Car {
    public name: string;
    public price: number;
    public type: Type;
    public imageURL: string;
    public street: string;
    public houseNumber: string;
    public postcode: string;
    public city: string;
  
  
    constructor(name: string ,price:number,type:Type,imageURL:string, street:string, houseNumber:string, postcode:string, city:string) {
      this.name = name;
      this.price = price;
      this.type = type;
      this.imageURL = imageURL;
      this.street= street;
      this.houseNumber= houseNumber;
      this.postcode=postcode;
      this.city=city;
    }

 
}

export enum Type {
  Electric = "Electric",
  Petrol = "Petrol",
  Diesel = "Diesel"
}