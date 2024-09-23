const Router = require('express')
const ApiError = require('../error/ApiError')
const deviceController = require('../controllers/deviceController')
const DevicePropController = require('../controllers/devicePropController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


const router = new Router()


/*
 * Товары
 */

router.get('/getall', deviceController.getAll)

router.get('/getone/:id([0-9]+)', deviceController.getOne)
router.get('/getone/', async (req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})

router.post('/create', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ deviceController.createDevice)

router.put('/update/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ deviceController.updateDevice)
router.put('/update/', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})

router.delete('/delete/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ deviceController.deleteDevice)
router.delete('/delete/', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})


/*
 * Свойства
 */

router.get('/:deviceId([0-9]+)/property/getall', DevicePropController.getAll)
router.get('/property/getall/', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})

router.get('/:deviceId([0-9]+)/property/getone/:id([0-9]+)', DevicePropController.getOne)
router.get('/property/getone/:id([0-9]+)', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})
router.get('/:deviceId([0-9]+)/property/getone/', async(req, res, next) => {
    try {
        throw new Error('Не указан id описания товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})

router.post(
    '/:deviceId([0-9]+)/property/create',
    // authMiddleware,
    // adminMiddleware,
    DevicePropController.createDeviceProp
)
router.post('/property/create', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})


router.put(
    '/:deviceId([0-9]+)/property/update/:id([0-9]+)',
    // authMiddleware,
    // adminMiddleware,
    DevicePropController.updateDeviceProp
)
router.put('/:deviceId([0-9]+)/property/update/', async(req, res, next) => {
    try {
        throw new Error('Не указан id описания товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})
router.put('/property/update/:id([0-9]+)', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})

router.delete(
    '/:deviceId([0-9]+)/property/delete/:id([0-9]+)',
    // authMiddleware,
    // adminMiddleware,
    DevicePropController.deleteDeviceProp
)
router.delete('/:deviceId([0-9]+)/property/delete/', async(req, res, next) => {
    try {
        throw new Error('Не указан id описания товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})
router.delete('/property/delete/:id([0-9]+)', async(req, res, next) => {
    try {
        throw new Error('Не указан id товара')
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
})


module.exports = router;