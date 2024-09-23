const Router = require('express')
const ApiError = require('../error/ApiError')
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


const router = new Router()

/*
* только для администратора магазина
*/

router.get('/admin/getall', authMiddleware, adminMiddleware, orderController.adminGetAll)

router.get('/admin/getall/user/:id([0-9]+)', authMiddleware, adminMiddleware, orderController.adminGetUser)
router.get('/admin/getall/user/', async (req, res, next) => {
    try {
        throw new Error('Не указан id пользователя')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

router.get('/admin/getone/:id([0-9]+)', authMiddleware, adminMiddleware, orderController.adminGetOne)
router.get('/admin/getone/', async (req, res, next) => {
    try {
        throw new Error('Не указан id заказа')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

router.post('/admin/create', authMiddleware, adminMiddleware, orderController.adminCreate)

router.delete('/admin/delete/:id([0-9]+)', authMiddleware, adminMiddleware, orderController.adminDelete)
router.delete('/admin/delete/', async (req, res, next) => {
    try {
        throw new Error('Не указан id заказа')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})


/*
* для авторизованного пользователя
*/

router.get('/user/getall', authMiddleware, orderController.userGetAll)

router.get('/user/getone/:id([0-9]+)', authMiddleware, orderController.userGetOne)
router.get('/user/getone/', async (req, res, next) => {
    try {
        throw new Error('Не указан id заказа')
    } catch(err) {
        next(ApiError.badRequest(err.message))
    }
})

router.post('/user/create', authMiddleware, orderController.userCreate)


/*
* для неавторизованного пользователя
*/

router.post('/guest/create', orderController.guestCreate)


module.exports = router;