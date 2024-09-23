const DevicePropModel = require('../models/devicePropModel')
const ApiError = require('../error/ApiError')


class DevicePropController {
    async getAll(req, res, next) {
        try {
            const properties = await DevicePropModel.getAll(req.params.deviceId)
            res.json(properties)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const property = await DevicePropModel.getOne(req.params.deviceId, req.params.id)
            res.json(property)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createDeviceProp(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) throw new Error('Нет данных для создания')
            
            const property = await DevicePropModel.create(req.params.deviceId, req.body)
            res.json(property)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async updateDeviceProp(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) throw new Error('Нет данных для обновления')
            
            const property = await DevicePropModel.update(req.params.deviceId, req.params.id, req.body)
            res.json(property)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteDeviceProp(req, res, next) {
        try {
            const property = await DevicePropModel.delete(req.params.deviceId, req.params.id)
            res.json(property)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new DevicePropController();