'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const express = require('express');
const app = express();
const discosRoutes = require('./routes/discos');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Leitura e registro dos modelos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configuração de associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Artista.belongsToMany(db.Disco, { through: 'ArtistaDiscos' });
db.Disco.belongsToMany(db.Artista, { through: 'ArtistaDiscos' });

db.Genero.belongsToMany(db.Disco, { through: 'GeneroDiscos' });
db.Disco.belongsToMany(db.Genero, { through: 'GeneroDiscos' });

db.Disco.hasMany(db.Faixa, { as: 'Faixas' });
db.Faixa.belongsTo(db.Disco);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Configuração do servidor Express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/discos', discosRoutes);

// Iniciando o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Exportando o banco de dados configurado
module.exports = db;
