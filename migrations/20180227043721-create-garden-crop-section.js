'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('garden_crop_sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      section_name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      number_of_rows: {
        type: Sequelize.INTEGER
      },
      row_item_count: {
        type: Sequelize.INTEGER
      },
      garden_id: {
        type: Sequelize.INTEGER
      },
      crop_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('garden_crop_sections');
  }
};