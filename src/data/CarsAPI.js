import cars from "./cars/cars_format";
import { GenericAPI } from "./GenericAPI";

export class CarsAPI extends GenericAPI {
    async fetchCars(popular = false) {
        let result = cars;
        await this.pause();
        if (popular) {
            result = this.popular(result);
        }
        return this.convertObjToSelect(result);
    }

    /**
     * Возвращает модели марки
     * @param {String} brand - бренд автомобиля
     */
    async fetchModelsByCar(car) {
        let result = cars;
        await this.pause()
        if (car in result) {
            return this.convertArrToSelect(result[car].list);
        } else {
            return null;
        }
    }

    /**
     * Фильтр по популярным авто
     * @param {Object} obj - объект с данными автомобилей
     */

    popular(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value.popular === true));
    }

    /**
     * Конверитрует данные для select
     * @param {Object} obj - объект с данными автомобилей
     */
    convertObjToSelect(obj) {
        return (obj && Object.keys(obj).map((item) => {
                const option = {};
                option.label = item || null;
                option.value = item || null;
                return option;
            }));
    }

    /**
     * Конверитрует массив для select
     * @param {Array} models - объект с данными автомобилей
     */
    convertArrToSelect(array) {
        return (array && array.map((item) => {
            const option = {};
            option.label = item || null;
            option.value = item || null;
            return option;
        }));
    }
}
