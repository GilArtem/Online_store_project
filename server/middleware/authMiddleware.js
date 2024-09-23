const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

// module.exports = function(req, res, next) {
//     if(req.method === "OPTIONS") {
//         next()
//     }
//     try{
//         const token = req.headers.authorization?.split(' ')[1]  // В header помещается сначала тип токена, а затем сам токен (Bearer frfrufiufh). Поэтому [1]
//         if(!token) {
//             throw new Error ('Пользователь не авторизован')
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)  // verify() проверяет токен на валидность
//         req.user = decoded
//         next()
//     } catch(err) {
//         next(ApiError.forbidden(err.message))  // 401 - код при ошибки авторизации пользователя
//     }
// };


// middleware требует, чтобы пользователь подтвердил свою личность с помощью JWT-токена. 
// Этот токен он получает либо после регистрации, либо после входа в личный кабинет.

const decode = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded;
    } catch(err) {
        throw new Error('Неверная подпись токена')
    }
}

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer token
        if (!token) {
            throw new Error('Пользователь не авторизован')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.auth = decoded
        next()
    } catch (err) {
        next(ApiError.forbidden(err.message))
    }
}

module.exports = auth;