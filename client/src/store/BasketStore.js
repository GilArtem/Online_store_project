// хранилище корзины

import { makeAutoObservable } from 'mobx'


class BasketStore {
    _devices = []

    constructor() {
        makeAutoObservable(this)
    }

    get devices() {
        return this._devices;
    }

    get count() { // всего позиций в корзине
        return this._devices.length;
    }

    get sum() { // стоимость всех товаров корзины
        return this._devices.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    set devices(devices) {
        this._devices = devices
    }
}

export default BasketStore;