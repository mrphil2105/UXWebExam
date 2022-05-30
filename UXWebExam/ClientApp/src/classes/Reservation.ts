import { Car } from "./Car";

export class Reservation {
    public car: Car;
    public start: String
    public end: String
  
  
    constructor(car: Car ,start: String,end: String) {
     this.car=car;
     this.end = end;
     this.start = start;
    }

 
}