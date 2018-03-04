'use strict';
module.exports = (sequelize, DataTypes) => {
  var note = sequelize.define('note', {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid Title. Must be between 1 and 99 characters.'
        }
      }
    },
    details: {
      type: DataTypes.TEXT
    },
    sectionId: DataTypes.INTEGER
  }, {});
  note.associate = function(models) {
    // associations can be defined here
    models.note.belongsTo(models.section);

  };
  return note;
};
