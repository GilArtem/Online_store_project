const Router = require('express')
const ApiError = require('../error/ApiError')
const typeController = require('../controllers/typeController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


const router = new Router()


router.get('/getall', typeController.getAll)

router.get('/getone/:id([0-9]+)', typeController.getOne)
router.get('/getone/', async (req, res, next) => {
    try {
        throw new Error('Не указан id типа товара')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}) 

router.post('/create', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ typeController.createType)

router.put('/update/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ typeController.updateType)
router.put('/update/', async (req, res, next) => {
    try {
        throw new Error('Не указан id типа товара')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}) 

router.delete('/delete/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ typeController.deleteType)
router.delete('/delete/', async (req, res, next) => {
    try {
        throw new Error('Не указан id типа товара')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}) 

module.exports = router;