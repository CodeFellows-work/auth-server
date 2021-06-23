'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory'

// const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

// const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
//   dialectOptions: {
//     ssl: true,
//     rejectUnauthorized: false,
//   }
// } : {}

const sequelize = new Sequelize(DATABASE_URL);
// const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory', DATABASE_CONFIG);
const userModel = userSchema(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel,
}