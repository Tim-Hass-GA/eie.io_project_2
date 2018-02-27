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
          msg: 'Invalid Type. Must be between 1 and 99 characters.'
        }
      }
    },
    date_planted: DataTypes.DATE,
    note_id: DataTypes.INTEGER
  }, {});
  crop.associate = function(models) {
    // associations can be defined here
    models.crop.belongsToMany(models.garden, {
      through: models.garden_crop_section
    });
  };
  return crop;
};
