const RatingModel = require('../models/ratingModel.js')
const ApiError = require('../error/ApiError.js')

class RatingController {
    async getOne(req, res, next) {
        try {
            const rating = await RatingModel.getOne(req.params.deviceId)
            res.json(rating)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createRating(req, res, next) {
        try {
            const {deviceId, rate} = req.params
            //const rating = await RatingModel.create(req.auth.userId, deviceId, rate)
            // Подставляем идентификаторы пользователей, от имени которых будем голосовать
            const rating = await RatingModel.create(1, deviceId, rate)
            res.json(rating)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }    
}


module.exports = new RatingController();