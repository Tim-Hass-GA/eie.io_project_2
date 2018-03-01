'use strict';
module.exports = (sequelize, DataTypes) => {
  var crop = sequelize.define('crop', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Crop Name. Must be between 1 and 99 characters.'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Crop Name. Must be between 1 and 99 characters.'
        }
      }
    },
    url: DataTypes.STRING,
    perennial: DataTypes.BOOLEAN,
    median_lifespan: DataTypes.INTEGER,
    days_to_first_harvest: DataTypes.INTEGER,
    days_to_last_harvest: DataTypes.INTEGER
  }, {});
  crop.associate = function(models) {
    // associations can be defined here
    models.crop.belongsTo(models.section);

  };
  return crop;
};
