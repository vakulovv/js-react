export class GenericAPI {
    constructor(delay) {}

    async pause(delay = this.delay) {
        if(!delay) {
            return;
        }
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}