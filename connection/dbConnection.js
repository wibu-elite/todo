
require('dotenv').config();
const {Pool} = require('pg')

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env

  const Client = new Pool({
  host : DB_HOST,
  database : DB_NAME,
  user : DB_USER,
  password : DB_PASSWORD
});
 module.exports = Client