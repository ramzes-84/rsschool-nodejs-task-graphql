import { GraphQLObjectType, GraphQLString } from 'graphql';

import { UUIDType } from './uuid.js';
import { IdArg, PrismaContext, UserInit } from '../types.js';
import { UserT } from './user-fields.js';
import { InputCreateUser } from './inputs.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: UserT,
      args: { data: { type: InputCreateUser } },
      resolve: (_, { data }: { data: UserInit }, { prisma }: PrismaContext) =>
        prisma.user.create({
          data,
        }),
    },

    deleteUser: {
      type: GraphQLString,
      args: { id: { type: UUIDType } },
      resolve: async (_, args: IdArg, { prisma }) => {
        await prisma.user.delete({
          where: args,
        });
      },
    },
  }),
});
