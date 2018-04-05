const Sequelize = require('sequelize');
/* eslint-disable global-require */
const db = {
  objects: {
    Post: require('./Post'),
    User: require('./User')
  }
};
const sequelize = new Sequelize({
  dialect: 'sqlite',
  // storage: './database.sqlite',
  logging: false
});

const buildRelationships = async (objects, models, s) => {
  const relationships = {};
  if (process.env.NODE_ENV !== 'production') await s.sync({ force: true });

  await Object.entries(objects).forEach(async ([key, object]) => {
    relationships[key] = {};
    if (object.connections) {
      relationships[key] = object.connections(models);
    }
  });
  await Object.values(objects).forEach(async object => {
    if (object.postSetup) {
      await object.postSetup(models, relationships);
    }
  });
  return relationships;
};

const configureModels = objects => {
  const models = {};

  // DECLARE MODELS
  Object.entries(objects).forEach(([key, value]) => {
    models[key] = value(Sequelize, sequelize);
  });

  return models;
};

db.models = configureModels(db.objects);
db.relationships = buildRelationships(db.objects, db.models, sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
