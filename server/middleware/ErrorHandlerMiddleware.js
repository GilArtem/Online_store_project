const ApiError = require('../error/ApiError')


// В условии ниже проверяется пренадлежность ошибки к созданному классу ApiError
// Если пренадлежит, то в ответ оправим статус-код и сообщением ошибки этого класса 
// Если нет, то кидаем 500 с соответсвующим сообщением

// Данная функция и есть миддлварь
const ErrorHandler = (err, req, res, next)=> {
    if(err instanceof ApiError){
        console.log('>>>>>>>>>>>>>>>>>>>>>')
        console.log(err)
        console.log('>>>>>>>>>>>>>>>>>>>>>')
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: `Упс... Непредвиденная ошибка: ${ err.message }` });
};

module.exports = ErrorHandler;