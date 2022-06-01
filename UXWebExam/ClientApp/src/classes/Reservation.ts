import CarModel from "../models/CarModel";
import { Car } from "./Car";

export class Reservation {
    public car: CarModel;
    public start: String
    public end: String
  
  
    constructor(car: CarModel ,start: String,end: String) {
     this.car=car;
     this.end = end;
     this.start = start;
    }

 
}