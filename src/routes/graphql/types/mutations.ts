import { GraphQLObjectType, GraphQLString } from 'graphql';

import { PostT } from './post.js';
import { UUIDType } from './uuid.js';
import {
  IdArg,
  PostInit,
  GQLContext,
  ProfileInit,
  SubscriptionInit,
  UserInit,
} from '../types.js';
import { ProfileT, UserT } from './user-fields.js';
import {
  InputCreatePost,
  InputChangePost,
  InputCreateUser,
  InputChangeUser,
  InputCreateProfile,
  InputChangeProfile,
} from './inputs.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: UserT as GraphQLObjectType,
      args: { dto: { type: InputCreateUser } },
      resolve: (_, { dto }: { dto: UserInit }, { prisma }: GQLContext) =>
        prisma.user.create({
          data: dto,
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
    changeUser: {
      type: UserT as GraphQLObjectType,
      args: {
        id: { type: UUIDType },
        dto: { type: InputChangeUser },
      },
      resolve: (_, { id, dto }: { id: string; dto: UserInit }, { prisma }) =>
        prisma.user.update({
          where: { id },
          data: dto,
        }),
    },

    createPost: {
      type: PostT,
      args: { dto: { type: InputCreatePost } },
      resolve: (_, { dto }: { dto: PostInit }, { prisma }) =>
        prisma.post.create({
          data: dto,
        }),
    },
    deletePost: {
      type: GraphQLString,
      args: { id: { type: UUIDType } },
      resolve: async (_, args: IdArg, { prisma }) => {
        await prisma.post.delete({
          where: args,
        });
      },
    },
    changePost: {
      type: PostT,
      args: {
        id: { type: UUIDType },
        dto: { type: InputChangePost },
      },
      resolve: (_, { id, dto }: { id: string; dto: PostInit }, { prisma }) =>
        prisma.post.update({
          where: { id },
          data: dto,
        }),
    },

    createProfile: {
      type: ProfileT,
      args: { dto: { type: InputCreateProfile } },
      resolve: (_, { dto }: { dto: ProfileInit }, { prisma }) =>
        prisma.profile.create({
          data: dto,
        }),
    },
    deleteProfile: {
      type: GraphQLString,
      args: { id: { type: UUIDType } },
      resolve: async (_, args: IdArg, { prisma }) => {
        await prisma.profile.delete({
          where: args,
        });
      },
    },
    changeProfile: {
      type: ProfileT,
      args: {
        id: { type: UUIDType },
        dto: { type: InputChangeProfile },
      },
      resolve: (_, { id, dto }: { id: string; dto: ProfileInit }, { prisma }) =>
        prisma.profile.update({
          where: { id },
          data: dto,
        }),
    },

    subscribeTo: {
      type: UserT as GraphQLObjectType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: (_, { userId, authorId }: SubscriptionInit, { prisma }) =>
        prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userSubscribedTo: {
              create: { authorId },
            },
          },
        }),
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: async (_, { userId, authorId }: SubscriptionInit, { prisma }) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId,
            },
          },
        });
      },
    },
  }),
});
