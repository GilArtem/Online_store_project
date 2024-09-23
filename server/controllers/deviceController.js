const ApiError = require('../error/ApiError')
const DeviceModel = require('../models/deviceModel')

class DeviceController {
    // Экспериментальный вариант:
    async getAll(req, res, next) {
        try {
            const {typeId = null, brandId = null} = req.params
            let {limit = null, page = null} = req.query
            limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 3
            page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1
            const options = {typeId, brandId, limit, page}
            const devices = await DeviceModel.getAll(options)
            res.json(devices)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
    

    async getOne(req, res, next) {
        try{
            const device = await DeviceModel.getOne(req.params.id)
            res.json(device)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createDevice (req, res, next) {
        try{
            if (Object.keys(req.body).length === 0) throw new Error('Нет данных для создания')
            
            const device = await DeviceModel.create(req.body, req.files?.image)
            res.json(device)
        } catch (err) {
             next(ApiError.badRequest(err.message))
        }
    }   

    async updateDevice(req, res, next) {
        try{
            if (Object.keys(req.body).length === 0) throw new Error('Нет данных для обновления')
            
            const device = await DeviceModel.update(req.params.id, req.body, req.files?.image)
            res.json(device)
            
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteDevice (req, res, next) {
        try{
            const device = await DeviceModel.delete(req.params.id)
            res.json(device)
        }catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
};

module.exports = new DeviceController();