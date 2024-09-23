// Хранилище для каталога

import { makeAutoObservable } from 'mobx'

class CatalogStore {
    _types = []
    _brands = []
    _devices = []
    _type = null // выбранный тип
    _brand = null // выбранный бренд
    _page = 1 // текущая страница
    _count = 0 // сколько всего товаров
    _limit = 3 // товаров на страницу

    constructor() {
        makeAutoObservable(this)
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get devices() {
        return this._devices;
    }

    get type() {
        return this._type;
    }

    get brand() {
        return this._brand;
    }

    get page() {
        return this._page;
    }

    get count() {
        return this._count;
    }

    get limit() {
        return this._limit;
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit);
    }

    set types(types) {
        this._types = types
    }

    set brands(brands) {
        this._brands = brands
    }

    set devices(devices) {
        this._devices = devices
    }

    set type(id) {
        this.page = 1
        this._type = id
    }

    set brand(id) {
        this.page = 1
        this._brand = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore;