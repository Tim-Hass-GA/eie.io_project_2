'use strict';
module.exports = (sequelize, DataTypes) => {
  var section = sequelize.define('section', {
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
    date_planted: DataTypes.DATEONLY,
    gardenId: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER
  }, {});
  section.associate = function(models) {
    // associations can be defined here
    models.section.belongsTo(models.garden);
    models.section.hasMany(models.note);
    models.section.hasOne(models.crop);
  };
  return section;
};
