const BasketModel = require('../models/basketModel')
const ApiError = require('../error/ApiError')


const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true 

class BasketController {
    async getOne (req, res, next) {
        try {
            console.log('BC|||||||||BC')
            console.log(req.signedCookies.basketId)
            console.log('BC|||||||||BC')
            let basket 
            if (req.signedCookies.basketId) {
                basket = await BasketModel.getOne(parseInt(req.signedCookies.basketId))
            } else {
                basket = await BasketModel.create()
            }
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)

        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async appendBasket (req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const {deviceId, quantity} = req.params
            const basket = await BasketModel.append(basketId, deviceId, quantity)
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async incrementBasket (req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const {deviceId, quantity} = req.params
            const basket = await BasketModel.increment(basketId, deviceId, quantity)
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async decrementBasket (req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const {deviceId, quantity} = req.params
            const basket = await BasketModel.decrement(basketId, deviceId, quantity)
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async removeBasket (req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const basket = await BasketModel.remove(basketId, req.params.deviceId)
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async clearBasket (req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const basket = await BasketModel.clear(basketId)
            
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)

        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }
}

module.exports = new BasketController();