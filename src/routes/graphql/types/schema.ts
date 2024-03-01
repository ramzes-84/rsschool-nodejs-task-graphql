import { GraphQLSchema } from 'graphql';
import { QueryType } from './user-fields.js';

export const schema = new GraphQLSchema({
  query: QueryType,
});
