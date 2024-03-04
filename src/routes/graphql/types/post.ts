import { GraphQLObjectType, GraphQLString } from 'graphql';
import { DataloaderContext } from '../types.js';
import { UUIDType } from './uuid.js';
import { UserT } from './user-fields.js';

export const PostT: GraphQLObjectType = new GraphQLObjectType({
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
        { loaders: { usersDataLoader } }: DataloaderContext,
      ) => await usersDataLoader.load(authorId),
    },
  }),
});
