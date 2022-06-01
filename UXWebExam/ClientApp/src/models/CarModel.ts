export default interface CarModel {
    id?: number;
    name: string;
    description: string;
    type: string;
    price: number;
    imageUrl: string;
    street: string;
    houseNumber: string;
    postalCode: number;
    city: string;
    longitude: number;
    latitude: number;
}
