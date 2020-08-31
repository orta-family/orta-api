import './env';

export const {
  NODE_ENV: ENV = 'production',
  OA_PORT: PORT = 3333,
} = process.env;

export default {
  ENV,
  PORT
};
