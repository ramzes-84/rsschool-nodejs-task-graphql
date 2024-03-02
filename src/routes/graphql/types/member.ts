import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';
import { MemberType } from '@prisma/client';
import { PrismaContext } from '../types.js';
import { ProfileT } from './user-fields.js';

export const MemberEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: MemberTypeId.BASIC,
    },
    business: {
      value: MemberTypeId.BUSINESS,
    },
  },
});

export const Member: GraphQLObjectType<MemberType, PrismaContext> = new GraphQLObjectType(
  {
    name: 'MemberType',
    fields: () => ({
      id: { type: MemberEnum },
      profiles: {
        type: new GraphQLList(ProfileT),
        resolve: ({ id }, _, { prisma }: PrismaContext) =>
          prisma.profile.findMany({ where: { memberTypeId: id } }),
      },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
    }),
  },
);
