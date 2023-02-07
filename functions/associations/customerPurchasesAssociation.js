const { DataTypes } = require('sequelize')

const { ShopItems, Users, Shops, CustomerPurchase } = require("../../models")

ShopItems.hasMany(CustomerPurchase, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
CustomerPurchase.belongsTo(ShopItems);

Shops.hasMany(CustomerPurchase, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
CustomerPurchase.belongsTo(Shops);

Users.hasMany(CustomerPurchase, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
});
CustomerPurchase.belongsTo(Users);

module.exports = { CustomerPurchase, Users }