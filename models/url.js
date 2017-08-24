module.exports = function(sequelize, DataTypes) {

    const Url = sequelize.define('url', {
        url: {
            type: DataTypes.STRING
        },
        content_type: {
            type: DataTypes.STRING
        },
        length: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        },
        archived: {
            type: DataTypes.BOOLEAN
        },
        deleted: {
            type: DataTypes.BOOLEAN
        }
    });

    Url.associate = function(models) {
        Url.belongsTo(models.user);
    };

    return Url;
};
