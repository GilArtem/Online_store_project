const { 
    Rating: RatingMapping,
    Device: DeviceMapping,
    User: UserMapping
} = require('./mapping.js')


class Rating {

    async getOne(deviceId) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')
        
        const votes = await RatingMapping.count({where: {deviceId}})
        if (votes) {
            const rates = await RatingMapping.sum('rate', {where: {deviceId}})
            return {rates, votes, rating: rates/votes};
        }
        
        return {rates: 0, votes: 0, rating: 0};
    }

    async create(userId, deviceId, rate) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')

        const user = await UserMapping.findByPk(userId)
        if (!user) throw new Error('Пользоватеь не найден в БД')

        const rating = await RatingMapping.create({userId, deviceId, rate})
        return rating;
    }    
}


module.exports = new Rating();