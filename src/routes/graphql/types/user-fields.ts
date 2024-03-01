import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { PrismaClient } from '@prisma/client';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: (
        _,
        __,
        {
          prisma,
        }: {
          prisma: PrismaClient;
        },
      ) => prisma.user.findMany(),
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, { id }: { id: string }, { prisma }) =>
        prisma.user.findUnique({ where: { id } }),
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  }),
});
