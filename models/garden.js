'use strict';
module.exports = (sequelize, DataTypes) => {
  var garden = sequelize.define('garden', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Garden Name. Must be between 1 and 99 characters.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Location. Must be between 1 and 99 characters.'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  garden.associate = function(models) {
    // associations can be defined here
    models.garden.hasMany(models.section);
    models.garden.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return garden;
};
