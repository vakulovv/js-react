import { CarsAPI } from "./CarsAPI";

export class API {
    constructor(delay = 500) {
        this.cars = new CarsAPI(delay);
        //this.cities = new CitiesAPI(delay);
    }
}