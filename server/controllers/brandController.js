const BrandModel = require("../models/brandModel")
const ApiError = require('../error/ApiError')


class BrandController {

    async getAll (req, res, next) {
        try{
            const brands = await BrandModel.getAll()
            res.json(brands)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne (req, res, next) {
        try{
            const brand = await BrandModel.getOne(req.params.id)
            res.json(brand)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createBrand (req, res, next) {
        try{
            const brand = await BrandModel.create(req.body)
            res.json(brand)   
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async updateBrand(req, res, next) {
        try{
            const brand = await BrandModel.update(req.params.id, req.body)
            res.json(brand)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteBrand (req, res, next) {
        try{
            const brand = await BrandModel.delete(req.params.id)
            res.json(brand)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
};

module.exports = new BrandController();