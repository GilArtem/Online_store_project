const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError")
const UserModel = require('../models/userModel')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'} // сколько времени проживет наш токен
    );
};

class UserController {
    // регистрация             (* ) (* )
    async registration (req, res, next) {
        const {email, password, role = 'USER'} = req.body
        try{
            if (!email || !password) throw new Error('Пустой email или пароль')
            if (role !== 'USER') throw new Error('Возможна только роль пользователя (USER)')
            
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await UserModel.create({email, password: hashPassword, role})
            
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token});
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async login (req, res, next) {
        try{
            const {email, password} = req.body
            
            // существует ли такой пользователь?
            const user = await UserModel.getByEmail(email)
            if (!user) throw new Error('Пользователь с такой почтой не найден')
            
            // пароль, указанный пользователем через форму совпадает с тем, что содержится в БД 
            let compare = bcrypt.compareSync(password, user.password)
            if (!compare) throw new Error('Указан неверный пароль')
            
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token});
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    // проверка аторизации пользователя
    async check (req, res, next) {
        const token = generateJwt(req.auth.id, req.auth.email, req.auth.role)
        return res.json({token});
    }

    async getAll(req, res, next) {
        try{
            const users = await UserModel.getAll()
            res.json(users)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        try{
            const user = await UserModel.getOne(req.params.id)
            res.json(user)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createUser(req, res, next) {
        const {email, password, role = 'USER'} = req.body
        try{
            if (!email || !password) throw new Error('Пустой email или пароль')
            if ( ! ['USER', 'ADMIN'].includes(role)) throw new Error('Недопустимое значение роли')
        
            const hashPassword = await bcrypt.hash(password, 5)
            
            const user = await UserModel.create({email, password: hashPassword, role})
            return res.json(user);
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async updateUser(req, res, next) {
        try{
            // Проверка предоставления данных на обновление 
            if (Object.keys(req.body).length === 0) throw new Error('Нет данных для обновления')

            let {email, password, role} = req.body

            if (role && !['USER', 'ADMIN'].includes(role)) throw new Error('Недопустимое значение роли')
    
            if (password) password = await bcrypt.hash(password, 5)
            
            const user = await UserModel.update(req.params.id, {email, password, role})
            
            res.json(user)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteUser(req, res, next) {
        try{
            const user = await UserModel.delete(req.params.id)
            res.json(user)
        }catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }
};

module.exports = new UserController();