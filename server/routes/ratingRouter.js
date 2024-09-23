const Router = require('express')
const ApiError = require('../error/ApiError')
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()


router.get('/device/:deviceId([0-9]+)', ratingController.getOne)
router.get('/device/', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})

router.post('/device/:deviceId([0-9]+)/rate/:rate([1-5])', /*authMiddleware),*/ ratingController.createRating)
router.post('/device/rate/:rate([1-5])', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})
router.post('/device/:deviceId([0-9]+)/rate/', async(req, res, next) => {
    try {
        throw new Error('Не указан id рейтинга')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})


module.exports = router;