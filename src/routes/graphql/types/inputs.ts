import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberEnum } from './member.js';

export const InputCreateUser = new GraphQLInputObjectType({
  name: 'InputCreateUser',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export const InputCreatePost = new GraphQLInputObjectType({
  name: 'InputCreatePost',
  fields: {
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export const InputCreateProfile = new GraphQLInputObjectType({
  name: 'InputCreateProfile',
  fields: {
    userId: { type: UUIDType },
    memberTypeId: { type: MemberEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});
