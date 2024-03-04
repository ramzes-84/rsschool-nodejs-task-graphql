import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { QueryType } from './user-fields.js';
import { Mutation } from './mutations.js';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: Mutation as GraphQLObjectType,
});
