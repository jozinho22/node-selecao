/* const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('person',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name : {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {msg: 'Ce nom est déjà pris'}, 
                validate: {
                    notNull: {msg: 'Le name ne peut être NULL'},
                    notEmpty: {msg: 'Ce champ ne peut être vide'},
                }
            },
            age: { 
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true
                }
            },
            createdBy:{
                type: DataTypes.STRING,
                allowNull: false
            },
            updatedBy:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },{
            createdAt: false,
            updateAt: false
        }
    )
} */