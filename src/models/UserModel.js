const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username : {
                type: DataTypes.STRING,
                unique: true
            },
            password: { 
                type: DataTypes.STRING
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
            /* createdAt: true,
            updatedAt: true, */
            timestamps: true
        }
    )
}