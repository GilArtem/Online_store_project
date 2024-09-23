const Router = require('express')
const ApiError = require('../error/ApiError')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router = new Router()


router.post('/signup', userController.registration)

router.post('/login', userController.login)

router.get('/check', /*authMiddleware, */ userController.check)


router.get('/getall',/*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ userController.getAll)

router.get('/getone/:id', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ userController.getOne)
router.get('/getone/', async (req, res, next) => {
    try {
        throw new Error('Не указан id пользователя')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}) 

router.post('/create', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ userController.createUser)

router.put('/update/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ userController.updateUser)
router.put('/update/', async (req, res, next) => {
    try {
        throw new Error('Не указан id пользователя')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}) 

router.delete('/delete/:id([0-9]+)', /*checkRole('ADMIN'), authMiddleware, adminMiddleware,*/ userController.deleteUser)
router.delete('/delete/', async (req, res, next) => {
    try {
        throw new Error('Не указан id пользователя')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
}) 

module.exports = router;