const {DataTypes} = require('sequelize');

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
            }
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true
        }
    )
}