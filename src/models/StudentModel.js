const {DataTypes} = require('sequelize');
const PersonModel = require('./PersonModel.js');

module.exports = (sequelize) => {
    return sequelize.define('student',
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
                allowNull: true
            },
            createdAt:{
                type: DataTypes.DATE,
                allowNull: true
            },
            updatedBy:{
                type: DataTypes.STRING,
                allowNull: true
            },
            updatedAt:{
                type: DataTypes.DATE,
                allowNull: true
            }
        },{
            /* createdAt: true, */
            updatedAt: true,
            timestamps: true
        }
    )
}