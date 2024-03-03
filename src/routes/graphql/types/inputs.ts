import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from 'graphql';

export const InputCreateUser = new GraphQLInputObjectType({
  name: 'InputCreateUser',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
