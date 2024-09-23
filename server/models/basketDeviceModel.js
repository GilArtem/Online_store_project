const { BasketDevice: BasketDeviceMapping, 
        Basket: BasketMapping 
} = require ('./mapping.js')


class BasketDevice {
    async getAll(basketId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) throw new Error('Корзина не найдена в БД')

        const items = await BasketDeviceMapping.findAll({where: {basketId}})
        return items;
    }

    async getOne(basketId, deviceId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) throw new Error('Корзина не найдена в БД')

        const item = await BasketDeviceMapping.findOne({where: {basketId, deviceId}})
        if (!item) throw new Error('Товара нет в корзине')

        return item;
    }

    async create(basketId, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) throw new Error('Корзина не найдена в БД')

        const {quantity = 1} = data
       
        const item = await BasketDeviceMapping.create({basketId, deviceId, quantity})
        return item;
    }

    async update(basketId, deviceId, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) throw new Error('Корзина не найдена в БД')

        const item = await BasketDeviceMapping.findOne({where: {basketId, deviceId}})
        if (!item) throw new Error('Товара нет в корзине')

        if (data.quantity) {
            await item.update({quantity})
        } else if (data.increment) {
            await item.increment('quantity', {by: data.increment})
        } else if (data.decrement) {
            await item.decrement('quantity', {by: data.decrement})
        }
        
        return item;
    }

    async delete(basketId, deviceId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) throw new Error('Корзина не найдена в БД')

        const item = await BasketDeviceMapping.findOne({where: {basketId, deviceId}})
        if (!item) throw new Error('Товара нет в корзине')

        await item.destroy()
        
        return item;
    }
}

module.exports = new BasketDevice();