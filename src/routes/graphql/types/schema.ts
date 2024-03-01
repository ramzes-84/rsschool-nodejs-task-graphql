import { GraphQLSchema } from 'graphql';
import { userObj } from './user-obj.js';

export const schema = new GraphQLSchema({
  query: userObj,
});
