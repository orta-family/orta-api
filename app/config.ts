import './env';

export const {
  NODE_ENV: ENV = 'production',
  OA_PG_USER: PG_USER,
  OA_PG_PASS: PG_PASS,
  OA_PG_HOST: PG_HOST,
  OA_PG_PORT: PG_PORT,
  OA_DB_NAME: DB_NAME,
  OA_PG_URL: PG_URL,
  OA_PORT: PORT = 3333,
} = process.env;

export default {
  ENV,
  PG_USER,
  PG_PASS,
  PG_HOST,
  PG_PORT,
  DB_NAME,
  PG_URL,
  PORT
};
