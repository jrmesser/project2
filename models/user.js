module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        }
    });

    User.associate = function(models) {
        User.hasOne(models.password, {
            onDelete: "cascade"
        });
    };

    User.associate = function(models) {
        User.hasMany(models.url, {
            onDelete: "cascade"
        });
    };

    return User;
};
