'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('session',{
      sid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      sess: {
        type: Sequelize.JSON
      },
      expire: {
        type: 'TIMESTAMP',
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('session');
  }
};
