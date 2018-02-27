'use strict';
module.exports = (sequelize, DataTypes) => {
  var garden_crop_section = sequelize.define('garden_crop_section', {
    section_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Section Name. Must be between 1 and 99 characters.'
        }
      }
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
    number_of_rows: DataTypes.INTEGER,
    row_item_count: DataTypes.INTEGER,
    garden_id: DataTypes.INTEGER,
    crop_id: DataTypes.INTEGER
  }, {});
  garden_crop_section.associate = function(models) {
    // associations can be defined here
  };
  return garden_crop_section;
};
