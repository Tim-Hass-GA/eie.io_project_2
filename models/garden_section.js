'use strict';
module.exports = (sequelize, DataTypes) => {
  var garden_section = sequelize.define('garden_section', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Garden Section Name. Must be between 1 and 99 characters.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    number_of_rows: {
      type: DataTypes.INTEGER
    },
    item_count: {
      type: DataTypes.INTEGER
    },
    date_planted: DataTypes.DATE,
    garden_id: {
      type: DataTypes.INTEGER
    },
    crop_id: {
      type: DataTypes.INTEGER
    }
  }, {});
  garden_section.associate = function(models) {
    // associations can be defined here
    models.garden_section.belongsTo(models.garden);
    models.garden_section.hasMany(models.note);
    models.garden_section.hasOne(models.crop);

  };
  return garden_section;
};
