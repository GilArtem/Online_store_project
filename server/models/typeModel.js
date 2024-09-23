const { Type: TypeMapping } = require('./mapping')

class Type {
    async getAll() {
        const types = await TypeMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return types;
    }

    async getOne(id) {
        const type = await TypeMapping.findByPk(id)
        if (!type) throw new Error('Тип не найден в базе данных')
        
        return type;
    } 

    async create(data) {
        const {name} = data
        
        const exist = await TypeMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой тип товара уже существует')
        }
        
        const type = await TypeMapping.create({name})
        
        return type;
    }

    async update(id, data) {
        const type = await TypeMapping.findByPk(id)
        if (!type) throw new Error('Тип не найден в базе данных')
        
        const {name = type.name} = data
        
        await type.update({name})
        
        return type;
    }

    async delete(id) {
        const type = await TypeMapping.findByPk(id)
        if (!type) throw new Error('Тип не найден в базе данных')

        await type.destroy()
        
        return type;
    }
};

module.exports = new Type();