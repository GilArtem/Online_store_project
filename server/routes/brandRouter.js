const Router = require('express')
const ApiError = require('../error/ApiError')
const BrandController = require('../controllers/brandController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


const router = new Router()


router.get('/getall', BrandController.getAll)

router.get('/getone/:id([0-9]+)', BrandController.getOne)
router.get('/getone/', async (req, res, next) => {
    try {
        throw new Error('Не указан id бренда')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

router.post('/create', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ BrandController.createBrand)  

router.put('/update/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ BrandController.updateBrand)
router.put('/update/', async (req, res, next) => {
    try {
        throw new Error('Не указан id бренда')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

router.delete('/delete/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ BrandController.deleteBrand) 
router.delete('/delete/', async (req, res, next) => {
    try {
        throw new Error('Не указан id бренда')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

module.exports = router;