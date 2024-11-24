'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Gêneros
    await queryInterface.bulkInsert('Generos', [
      { nome: 'Rock', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Pop', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Artistas
    await queryInterface.bulkInsert('Artistas', [
      { nome: 'Queen', genero: 'Rock', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Michael Jackson', genero: 'Pop', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Discos
    await queryInterface.bulkInsert('Discos', [
      { titulo: 'A Night at the Opera', ano: 1975, capa: null, createdAt: new Date(), updatedAt: new Date() },
      { titulo: 'Thriller', ano: 1982, capa: null, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Faixas
    await queryInterface.bulkInsert('Faixas', [
      { nome: 'Bohemian Rhapsody', DiscoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Thriller', DiscoId: 2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Faixas', null, {});
    await queryInterface.bulkDelete('Discos', null, {});
    await queryInterface.bulkDelete('Artistas', null, {});
    await queryInterface.bulkDelete('Generos', null, {});
  }
};
