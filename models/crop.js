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
      allowNull: true,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Crop Type. Must be between 1 and 99 characters.'
        }
      }
    }
  }, {});
  crop.associate = function(models) {
    // associations can be defined here
    models.crop.belongsTo(models.garden_section);
  };
  return crop;
};
