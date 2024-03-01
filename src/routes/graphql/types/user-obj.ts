import { GraphQLObjectType, GraphQLScalarType } from 'graphql';

export const userObj = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: new GraphQLScalarType({ name: 'Roman' }),
    },
    car: {
      type: new GraphQLScalarType({ name: 'Ferr' }),
    },
  }),
});
