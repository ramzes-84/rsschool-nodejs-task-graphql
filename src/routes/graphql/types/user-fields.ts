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

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, __, { prisma }: PrismaContext) => prisma.user.findMany(),
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: (_, { id }: IdArg, { prisma }) =>
        prisma.user.findUnique({ where: { id } }),
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    profile: {
      type: ProfileT,
      resolve: async ({ id }: IdArg, _, { prisma }: PrismaContext) =>
        await prisma.profile.findUnique({ where: { id } }),
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
      type: UserType,
      resolve: async ({ id }: IdArg, _, { prisma }: PrismaContext) =>
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
