const { Device: DeviceMapping, 
        DeviceProp: DevicePropMapping 
} = require('./mapping')


class DeviceProp {
    async getAll(deviceId) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')
        
        const properties = await DevicePropMapping.findAll({where: {deviceId}})
        
        return properties;
    }

    async getOne(deviceId, id) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')
        
        const property = await DevicePropMapping.findOne({where: {deviceId, id}})
        if (!property) throw new Error('Свойство товара не найдено в БД')
        
        return property;
    }

    async create(deviceId, data) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')
        
        const {name, value} = data
       
        const property = await DevicePropMapping.create({name, value, deviceId})
        
        return property;
    }

    async update(deviceId, id, data) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')
        
        const property = await DevicePropMapping.findOne({where: {deviceId, id}})
        if (!property) throw new Error('Свойство товара не найдено в БД')

        const {name = property.name, value = property.value} = data
        
        await property.update({name, value})
        
        return property;
    }

    async delete(deviceId, id) {
        const device = await DeviceMapping.findByPk(deviceId)
        if (!device) throw new Error('Товар не найден в БД')
        
        const property = await DevicePropMapping.findOne({where: {deviceId, id}})
        if (!property) throw new Error('Свойство товара не найдено в БД')
        
        await property.destroy()
        
        return property;
    }
}

module.exports = new DeviceProp();