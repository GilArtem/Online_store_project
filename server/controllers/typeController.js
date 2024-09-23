//const { Type: TypeMapping } = require('../models/mapping')
const TypeModel = require('../models/typeModel')
const ApiError = require('../error/ApiError')

class TypeController {
    async getAll (req, res, next) {
        try{
            const types = await TypeModel.getAll()
            res.json(types)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        try{
            const type = await TypeModel.getOne(req.params.id)
            res.json(type)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createType (req, res, next) {
        try{
            const type = await TypeModel.create(req.body)
            res.json(type)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async updateType(req, res, next) {
        try{
            const type = await TypeModel.update(req.params.id, req.body)
            res.json(type)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteType (req, res, next) {
        try{
            const type = await TypeModel.delete(req.params.id)
            res.json(type)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
};

module.exports = new TypeController();