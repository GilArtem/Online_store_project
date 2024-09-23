const Router = require('express')
const BasketController = require('../controllers/basketController')
const ApiError = require('../error/ApiError')

const router = new Router()


router.get('/getone', BasketController.getOne)

router.put('/device/:deviceId([0-9]+)/append/quantity([0-9]+)', BasketController.appendBasket)
router.put('/device/append/quantity([0-9]+)', async (req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})
router.put('/device/:deviceId([0-9]+)/append/', async (req, res, next) => {
    try {
        throw new Error('Не указан кол-во товара')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

router.put('/device/:deviceId([0-9]+)/increment/quantity([0-9]+)', BasketController.incrementBasket)

router.put('/device/:deviceId([0-9]+)/dectement/quantity([0-9]+)', BasketController.decrementBasket)

router.put('/device/:deviceId([0-9]+)/remove', BasketController.removeBasket)

router.put('/clear', BasketController.clearBasket)


module.exports = router;