const Router = require('express')

const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const basketRouter = require('./basketRouter')
const ratingRouter = require('./ratingRouter')
const orderRouter = require('./orderRouter')

const router = new Router()


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)
router.use('/order', orderRouter)

module.exports = router;