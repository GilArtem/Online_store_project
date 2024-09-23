const { 
    Basket: BasketMapping, 
    Device: DeviceMapping,
    BasketDevice: BasketDeviceMapping 
} = require('./mapping.js')


const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.devices = []

    if (basket.devices) {
        data.devices = basket.devices.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.basket_device.quantity
            };
        })
    }
    
    return data;
}

class Basket {
    async getOne (basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: DeviceMapping, attributes: ['id', 'name', 'price']},
            ],
        })
        if (!basket) basket = await BasketMapping.create()
        
        return pretty(basket);
    }

    async create () {
        const basket = await BasketMapping.create()
        return pretty(basket);
    }

    async append (basketId, deviceId, quantity) { 
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: DeviceMapping, attributes: ['id', 'name', 'price']},
            ],
        })
        
        if (!basket) basket = await BasketMapping.create()

        // Проверяем имеется ли уже этот товар в корзине
        const basket_device = await BasketDeviceMapping.findOne({
            where: {basketId, deviceId}
        })
        if (basket_device) { // коли есть в корзине 
            await basket_device.increment('quantity', {by: quantity})
        } else { // коли нет 
            await BasketDeviceMapping.create({basketId, deviceId, quantity})
        }
       
        // обновляем для вывода свежих данных
        await basket.reload()
       
        return pretty(basket);
    }

    async increment (basketId, deviceId, quantity) { 
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: DeviceMapping, as: 'devices'}]
        })
        if(!basket) basket = await BasketMapping. create()

        // проверка на наличие товара в корзине 
        const basket_device = await BasketDeviceMapping.findOne({
            where: {basketId, deviceId}
        })
        if (basket_device) {
            await basket_device.increment('quantity', {by: quantity})
            // возвращаем сежие данные 
            await basket.reload()
        }
       
        return pretty(basket);
    }

    async decrement (basketId, deviceId, quantity) { 
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: DeviceMapping, as: 'devices'}]
        })
        if (!basket) basket = await Basket.create()

        // проверка на наличие товара в корзине 
        const basket_device = await BasketDeviceMapping.findOne({
            where: {basketId, deviceId}
        })
        if (basket_device) {
            if (basket_device.quantity > quantity) {
                await basket_device.decrement('quantity', {by: quantity})
            } else {
                await basket_device.destroy()
            }
            await basket.reload()
        }
       
        return pretty(basket);
    }

    async remove (basketId, deviceId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: DeviceMapping, as: 'devices'}]
        })
        if (!basket) basket = await Basket.create()

        // проверка на наличие товара в корзине
        const basket_device = await BasketDeviceMapping.findOne({
            where: {basketId, deviceId}
        })
        if (basket_device) {
            await basket_device.destroy()
            await basket.reload()
        }
        
        return pretty(basket);
    }

    async clear (basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: DeviceMapping, as: 'devices'}]
        })
        if (!basket) {
            basket = await Basket.create()
        } else {
            await BasketDeviceMapping.destroy({where: {basketId}})
            await basket.reload()
        }
        
        return pretty(basket);
    }

    async delete (basketId) {
        const basket = await BasketMapping.findByPk(basketId, {
            include: [{model: DeviceMapping, as: 'devices'}]
        })
        if (!basket) throw new Error('Корзина не найдена в базе данных')

        await basket.destroy()
       
        return pretty(basket);
    }
}

module.exports = new Basket()