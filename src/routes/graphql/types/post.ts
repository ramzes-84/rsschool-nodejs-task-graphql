import { GraphQLObjectType, GraphQLString } from 'graphql';
import { PrismaContext } from '../types.js';
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
      resolve: ({ authorId }: { authorId: string }, _, { prisma }: PrismaContext) =>
        prisma.user.findUnique({ where: { id: authorId } }),
    },
  }),
});
