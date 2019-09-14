'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('tasks', [
      {
        description: 'Aprender a generar son seeders datos',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Comprar un timmer',
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Aprender a aprender aprendiendo aprendizaje',
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('tasks', null, {});
  }
};
