class ApiError extends Error {
    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }

    // статическая функция та, которую можно вызывать без объекта 
    static badRequest(message){
        return new ApiError(404, message);
    }

    // внутренняя ошибка (со стороны сервера)
    static internal(message){
        return new ApiError(500, message);
    }

    // доступа нет 
    static forbidden(message){
        return new ApiError(403, message);
    }
};

module.exports = ApiError;