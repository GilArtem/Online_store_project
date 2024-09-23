const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const path = require('path')
const fileUpload = require('express-fileupload')
const mapping = require('./models/mapping')
const router = require('./routes/index')
const ErrorHandler = require('./middleware/ErrorHandlerMiddleware')

const PORT = process.env.PORT || 3000
const app = express()

// Cross-Origin Resource Sharing (настройки CORS (разрешить куки от клиетнта))
app.use(cors({ origin: ['http://localhost:3000'], credentials: true })) 
// Для парсинга формата JSON
app.use(express.json())
// middleware для статики (img, css). Cможем получить изображение по ссылке на него в браузере
app.use(express.static(path.resolve(__dirname, 'static')))
// middleware для загрузки файлов
app.use(fileUpload({}))
// middleware для работы с cookie
app.use(cookieParser(process.env.SECRET_KEY))
// все маршруты приложения
app.use('/api', router)
// Обработка ошибок, последний Middleware!
app.use(ErrorHandler)  

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.log(err)
    }
};

start()
