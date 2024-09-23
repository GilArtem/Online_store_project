const FileService = require('../services/File.js')
const { Device: DeviceMapping, 
        DeviceProp: DevicePropMapping, 
        Type: TypeMapping, 
        Brand: BrandMapping 
} = require('./mapping')


class Device {
    async getAll(options) {
        const {typeId, brandId, limit, page} = options
        const offset = (page - 1) * limit
        const where = {}
        
        if (typeId) where.typeId = typeId
        if (brandId) where.brandId = brandId
        
        const devices = await DeviceMapping.findAndCountAll({
            where,
            limit,
            offset,
            // получаем бренд и категорию для каждого товара
            include: [
                {model: BrandMapping, as: 'brand'},
                {model: TypeMapping, as: 'type'},
            ],
            order: [
                ['name', 'ASC'],
            ],
        })
        
        return devices;
    }

    async getOne(id) {
        const device = await DeviceMapping.findByPk(id, {
            include: [
                {model: DevicePropMapping, as: 'props'},
                {model: BrandMapping, as: 'brand'},
                {model: TypeMapping, as: 'type'},
            ]
        })
        
        if(!device) throw new Error('Товар не найден в базе данных')
        
        return device;
    }


    async create(data, img) {
        const image = FileService.save(img) ?? ''
        const {name, price, brandId = null, typeId = null} = data
        const device = await DeviceMapping.create({name, price, image, brandId, typeId})    
        
        if (data.props) {  // data.props это массив [{}, {}]
            const props = JSON.parse(data.props)
            for (let prop of props) {
                await DevicePropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    deviceId: device.id
                })
            }
        }

        // Взозвращаем товар с его свойствами 
        const createdDevice = await DeviceMapping.findByPk(device.id, {include: [ {model: DevicePropMapping, as: 'props'}, ]})
        
        return createdDevice;
    }

    
    async update(id, data, img) {      
        const device = await DeviceMapping.findByPk(id, {include: [ {model: DevicePropMapping, as: 'props'}, ] })
        if(!device) throw new Error ('Товар не найден в базе данных')

        // пробуем сохранить изображение, если оно было загружено
        const file = FileService.save(img)
        
        // если загружено новое изображение, то нужно удалить старое
        if(file && device.image) FileService.delete(device.image)
        
        // готовим данные, для обновления в базе данных
        const {
            name = device.name || data.name,
            price = device.price || data.price,
            typeId = device.typeId || data.typeId,
            brandId = device.brandId || data.brandId,
            image = file ? file : device.image,
        } = data
        
        await device.update({name, price, typeId, image, brandId})
        
        if(data.props) {
            // свойства товара (удаляем старые и добавляем новые)
            await DevicePropMapping.destroy({where: {deviceId: id}})
            const props = JSON.parse(data.props)
            for(let prop of props) {
                await DevicePropMapping.create({
                    name: prop.name,
                    value: prop.value,
                    deviceId: device.id
                })
            } 
        }
       
        // обновим объект товара, чтобы вернуть свежие данные
        await device.reload()
       
        return device;
    }
    
    async delete(id) {
        const device = await DeviceMapping.findOne({
            where: {id},
            include: [{model: DevicePropMapping, as: 'props'}] // указано включение связанных данных
        })
        
        if(!device) throw new Error ('Товар не найден в базе данных')
        
        if(device.image) FileService.delete(device.image)  // удаляем изображение товара

        await device.destroy()
        
        return device;
    }
};

module.exports = new Device();

