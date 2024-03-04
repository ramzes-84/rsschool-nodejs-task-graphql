import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';
import { MemberEnum } from './member.js';
import { UUIDType } from './uuid.js';

export const InputCreateUser = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export const InputChangeUser = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export const InputCreatePost = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export const InputChangePost = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export const InputCreateProfile = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    userId: { type: UUIDType },
    memberTypeId: { type: MemberEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});

export const InputChangeProfile = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    memberTypeId: { type: MemberEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});
