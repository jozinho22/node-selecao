const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('club',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name : {
                type: DataTypes.STRING,
                allowNull: false
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
           /*  updatedAt: true, */
            timestamps: true
        }
    )
}