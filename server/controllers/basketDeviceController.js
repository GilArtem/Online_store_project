const BasketDeviceModel = require ('../models/basketDeviceModel')
const BasketModel = require ('../models/basketModel')
const ApiError = require ('../error/ApiError')

// проверка существования корзины
const check = async (req, res, next) => {
    try {

        if (!req.signedCookies.basketId) throw new Error('Корзина еще не создана')

        //const exist = await BasketDeviceModel.isExist(req.signedCookies.basketId)
        const exist = await BasketModel.isExist(req.signedCookies.basketId)

        if (!exist) {
            res.clearCookie('basketId')
            throw new Error('Корзина не найдена в БД')
        }

    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}

class BasketDeviceController {
    async getAll(req, res, next) {
        await check(req, res, next) 
        try {
            const devices = await BasketDeviceModel.getAll(req.signedCookies.basketId)
            res.json(devices)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async create(req, res, next) {
        await check(req, res, next) 
        try {
            if (!req.params.deviceId) throw new Error('Не указан id товара')

            const item = await BasketDeviceModel.create(
                req.signedCookies.basketId,
                req.params.deviceId,
                req.body
            )
            res.json(item)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async update(req, res, next) {
        await check(req, res, next) 
        try {
            if (!req.params.deviceId) throw new Error('Не указан id товара')
            
            const item = await BasketDeviceModel.update(
                req.signedCookies.basketId,
                req.params.deviceId,
                req.body
            )
            res.json(item)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async delete(req, res, next) {
        await check(req, res, next) 
        try {
            if (!req.params.deviceId) throw new Error('Не указан id товара')

            const item = await BasketDeviceModel.delete(
                req.signedCookies.basketId,
                req.params.deviceId,
            )
            res.json(item)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new BasketDeviceController();