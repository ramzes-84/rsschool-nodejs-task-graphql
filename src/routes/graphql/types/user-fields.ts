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
import { IdArg, PrismaContext } from '../types.js';
import { Profile } from '@prisma/client';
import { Member, MemberEnum } from './member.js';
import { PostT } from './post.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserT),
      resolve: (_, __, { prisma }: PrismaContext) => prisma.user.findMany(),
    },
    user: {
      type: UserT,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, { id }: IdArg, { prisma }) =>
        prisma.user.findUnique({ where: { id } }),
    },
  }),
});

export const UserT = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    profile: {
      type: ProfileT,
      resolve: async ({ id }: IdArg, _, { prisma }: PrismaContext) =>
        await prisma.profile.findUnique({ where: { id } }),
    },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostT),
      resolve: async ({ id }, _, { prisma }: PrismaContext) =>
        await prisma.post.findUnique({ where: { id } }),
    },

    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  }),
});

export const ProfileT: GraphQLObjectType<Profile, PrismaContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: UserT,
      resolve: async ({ id }, _, { prisma }: PrismaContext) =>
        await prisma.user.findUnique({ where: { id } }),
    },
    memberTypeId: { type: MemberEnum },
    memberType: {
      type: Member,
      resolve: async ({ id }, _, { prisma }: PrismaContext) =>
        await prisma.memberType.findUnique({ where: { id } }),
    },
  }),
});
