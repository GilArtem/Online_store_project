// middleware проверяет, что роль пользователя имеет значение 
// ADMIN — и дает ему дополнительные права по сравнению с обычным пользователем.

const ApiError = require('../error/ApiError')

const admin = (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
            next()
        }
        if (req.auth.role !== 'ADMIN') {
            throw new Error('Отсутсвуют права доступа. (Только администратор)')
        }
        next()
    }catch (err) {
        next(ApiError.forbidden(err.message))
    }
}

module.exports = admin;