import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GQLContext } from '../types.js';
import { UUIDType } from './uuid.js';
import { UserT } from './user-fields.js';
import { Post } from '@prisma/client';

export const PostT: GraphQLObjectType = new GraphQLObjectType<Post, GQLContext>({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserT as GraphQLObjectType,
      resolve: async (
        { authorId }: { authorId: string },
        _,
        { loaders: { usersDataLoader } }: GQLContext,
      ) => await usersDataLoader.load(authorId),
    },
  }),
});
