import { GraphQLObjectType, GraphQLString } from 'graphql';

import { UUIDType } from './uuid.js';
import { IdArg, PostInit, PrismaContext, ProfileInit, UserInit } from '../types.js';
import { ProfileT, UserT } from './user-fields.js';
import { InputCreatePost, InputCreateProfile, InputCreateUser } from './inputs.js';
import { PostT } from './post.js';

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
    changeUser: {
      type: UserT,
      args: {
        id: { type: UUIDType },
        data: { type: InputCreateUser },
      },
      resolve: (_, { id, data }: { id: string; data: UserInit }, { prisma }) =>
        prisma.user.update({
          where: { id },
          data,
        }),
    },
    createPost: {
      type: PostT,
      args: { data: { type: InputCreatePost } },
      resolve: (_, { data }: { data: PostInit }, { prisma }: PrismaContext) =>
        prisma.post.create({
          data,
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
        data: { type: InputCreatePost },
      },
      resolve: (_, { id, data }: { id: string; data: PostInit }, { prisma }) =>
        prisma.post.update({
          where: { id },
          data,
        }),
    },
    createProfile: {
      type: ProfileT,
      args: { data: { type: InputCreateProfile } },
      resolve: (_, { data }: { data: ProfileInit }, { prisma }) =>
        prisma.profile.create({
          data,
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
        data: { type: InputCreateProfile },
      },
      resolve: (_, { id, data }: { id: string; data: ProfileInit }, { prisma }) =>
        prisma.profile.update({
          where: { id },
          data,
        }),
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma },
      ) => {
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
    subscribeTo: {
      type: UserT,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
      resolve: (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        { prisma },
      ) =>
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
  }),
});
