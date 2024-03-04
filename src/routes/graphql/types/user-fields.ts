import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { IdArg, GQLContext } from '../types.js';
import { Profile } from '@prisma/client';
import { Member, MemberEnum } from './member.js';
import { PostT } from './post.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserT),
      resolve: (_, __, { prisma }: GQLContext) => prisma.user.findMany(),
    },
    profiles: {
      type: new GraphQLList(ProfileT),
      resolve: (_, __, { prisma }) => prisma.profile.findMany(),
    },
    posts: {
      type: new GraphQLList(PostT),
      resolve: (_, __, { prisma }) => prisma.post.findMany(),
    },
    memberTypes: {
      type: new GraphQLList(Member),
      resolve: (_, __, { prisma }) => prisma.memberType.findMany(),
    },
    user: {
      type: UserT as GraphQLObjectType,
      args: { id: { type: UUIDType } },
      resolve: (_, { id }: IdArg, { prisma }: GQLContext) =>
        prisma.user.findUnique({ where: { id } }),
    },
    post: {
      type: PostT,
      args: { id: { type: UUIDType } },
      resolve: (_, { id }: IdArg, { prisma }: GQLContext) =>
        prisma.post.findUnique({ where: { id } }),
    },
    profile: {
      type: ProfileT,
      args: { id: { type: UUIDType } },
      resolve: (_, { id }: IdArg, { prisma }: GQLContext) =>
        prisma.profile.findUnique({ where: { id } }),
    },
    memberType: {
      type: Member,
      args: { id: { type: MemberEnum } },
      resolve: (_, { id }: IdArg, { prisma }: GQLContext) =>
        prisma.memberType.findUnique({ where: { id } }),
    },
  }),
});

export const UserT = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    profile: {
      type: ProfileT,
      resolve: async (
        { id }: IdArg,
        _,
        { loaders: { profilesDataLoader } }: GQLContext,
      ) => await profilesDataLoader.load(id),
    },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostT),
      resolve: ({ id }, _, { prisma }: GQLContext) =>
        prisma.post.findMany({ where: { authorId: id } }),
    },
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserT),
      resolve: ({ id }: IdArg, _, { prisma }) =>
        prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        }),
    },
    subscribedToUser: {
      type: new GraphQLList(UserT),
      resolve: ({ id }: IdArg, _, { prisma }) =>
        prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        }),
    },
  }),
});

export const ProfileT: GraphQLObjectType<Profile, GQLContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberEnum },
    memberType: {
      type: Member,
      resolve: ({ memberTypeId }, _, { prisma }: GQLContext) =>
        prisma.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  }),
});
