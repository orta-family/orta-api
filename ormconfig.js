const dotenv = require('dotenv');
dotenv.config();

const {
  OA_PG_USER: PG_USER,
  OA_PG_PASS: PG_PASS,
  OA_PG_HOST: PG_HOST,
  OA_PG_PORT: PG_PORT,
  OA_DB_NAME: DB_NAME,
} = process.env;

module.exports = {
  "type": "postgres",
  "host": PG_HOST,
  "port": PG_PORT,
  "username": PG_USER,
  "password": PG_PASS,
  "database": DB_NAME,
  "synchronize": false,
  "logging": "all",
  "entities": [
     "app/entity/**/*.ts"
  ],
  "migrations": [
     "app/migration/**/*.ts"
  ],
  "subscribers": [
     "app/subscriber/**/*.ts"
  ],
  "cli": {
     "entitiesDir": "app/entity",
     "migrationsDir": "app/migration",
     "subscribersDir": "app/subscriber"
  },
  "uuidExtension": "pgcrypto"
}