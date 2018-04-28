import { buildSchema } from 'graphql';
import auth from './auth';
import types from './types';

export default buildSchema(`
  ${types}
  ${auth.schema}
`)