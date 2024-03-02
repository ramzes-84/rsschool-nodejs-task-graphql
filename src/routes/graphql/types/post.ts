import { GraphQLObjectType, GraphQLString } from 'graphql';
import { IdArg, PrismaContext } from '../types.js';
import { UUIDType } from './uuid.js';
import { Post } from '@prisma/client';
import { UserT } from './user-fields.js';

export const PostT: GraphQLObjectType<Post, PrismaContext> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },

    author: {
      type: UserT,
      resolve: async ({ id }: IdArg, _, { prisma }: PrismaContext) =>
        await prisma.user.findUnique({ where: { id } }),
    },
  }),
});
