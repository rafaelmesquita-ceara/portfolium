const knex = require('knex');

const configuration = require('../config/knexfile');

const connection = knex(configuration.development);

module.exports = connection;