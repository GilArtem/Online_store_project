/*
* Описание моделей 
*/ 

const sequelize = require('../db')
const database = require('sequelize')

const { DataTypes } = database

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

// Внешние ключи sequelize подставит сам во время описи типов связи 
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// связь между корзиной и товаром через промежуточную таблицу «basket_devices»
// у этой таблицы будет составной первичный ключ (basket_id + device_id)
const BasketDevice = sequelize.define('basket_device', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0}, 
    image: {type: DataTypes.STRING, allowNull: false}, 
})

const DeviceProp = sequelize.define('device_prop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    comment: {type: DataTypes.STRING},
    prettyCreateAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
        }
    },
})

// позиции заказа, в одном заказе может быть несколько позиций (товаров)
const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})

// // ???
// // Внимание! Связующая таблица при отношении многи ко многим 
// const TypeBrand = sequelize.define('type_brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })


// Описвыем связи таблиц друг с другом:

// ???
// User.hasOne(Basket)
// Basket.belongsTo(User) // корзина пренадлежит пользователю 

// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)
Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

// связь категории с товарами: в категории может быть несколько товаров, но
// каждый товар может принадлежать только одной категории
Type.hasMany(Device, {onDelete: 'RESTRICT'}) // если попытаться удалить запись из таблицы Type, которая связана с одной или несколькими записями в таблице Device, то будет применена ограничительная (RESTRICT) операция удаления, что означает, что удаление записи из таблицы Type будет отклонено, если на нее есть ссылки в таблице Device.
Device.belongsTo(Type)

// связь бренда с товарами: у бренда может быть много товаров, но каждый товар
// может принадлежать только одному бренду
Brand.hasMany(Device, {onDelete: 'RESTRICT'})
Device.belongsTo(Brand)

// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// это обеспечит возможность любых include при запросах findAll, findOne, findByPk
Device.hasMany(Rating)
Rating.belongsTo(Device)
User.hasMany(Rating)
Rating.belongsTo(User)

// связь товара с его свойствами: у товара может быть несколько свойств, но
// каждое свойство связано только с одним товаром
Device.hasMany(DeviceProp, {as: 'props', onDelete: 'CASCADE'})  // указываем название поля массива характерсистик
DeviceProp.belongsTo(Device)

// связь заказа с позициями: в заказе может быть несколько позиций, но
// каждая позиция связана только с одним заказом
Order.hasMany(OrderItem, {as: 'items', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order)

// связь заказа с пользователями: у пользователя может быть несколько заказов,
// но заказ может принадлежать только одному пользователю
User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)


// Cвязь многие ко многим

// ???
// Type.belongsToMany(Brand, {through: TypeBrand, onDelete: 'CASCADE'})
// Brand.belongsToMany(Type, {through: TypeBrand, onDelete: 'CASCADE'})

// связь many-to-many товаров и корзин через промежуточную таблицу basket_devices;
// товар может быть в нескольких корзинах, в корзине может быть несколько товаров
Basket.belongsToMany(Device, {through: BasketDevice, onDelete: 'CASCADE'}) //  при удалении записи из одной таблицы, все связанные записи из второй таблицы также будут удалены автоматически.
Device.belongsToMany(Basket, {through: BasketDevice, onDelete: 'CASCADE'})

// связь many-to-many товаров и пользователей через промежуточную таблицу rating;
// за один товар могут проголосовать несколько зарегистрированных пользователей,
// один пользователь может проголосовать за несколько товаров
Device.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
User.belongsToMany(Device, {through: Rating, onDelete: 'CASCADE'})


// Экспортируем созданные модели:
module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    //TypeBrand, ???
    Rating,
    DeviceProp,
    Order,
    OrderItem,
}