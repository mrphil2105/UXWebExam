import CarModel from "./CarModel";

export interface BookingModel {
    id: number;
    startDate: string;
    endDate: string;
    car: CarModel;
}
