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
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Number of rows must be greater than zero.'
        }
      }
    },
    item_count: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Number of items must be greater than zero.'
        }
      }
    },
    date_planted: DataTypes.DATEONLY,
    gardenId: DataTypes.INTEGER
  }, {});
  section.associate = function(models) {
    // associations can be defined here
    models.section.hasMany(models.note);
    models.section.belongsTo(models.garden, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return section;
};
