import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import { MemberTypeId } from '../member-types/schemas.js';
import DataLoader from 'dataloader';

export type IdArg = {
  id: string;
};

export type GQLContext = {
  prisma: PrismaClient;
  loaders: DataLoaders;
};

export type ProfileInit = {
  userId: string;
  memberTypeId: MemberTypeId;
  isMale: boolean;
  yearOfBirth: number;
};

export type UserInit = {
  name: string;
  balance: number;
};

export type PostInit = { authorId: string; content: string; title: string };

export type SubscriptionInit = { userId: string; authorId: string };

export type DataLoaders = {
  usersDataLoader: DataLoader<string, null | User>;
  profilesDataLoader: DataLoader<string, null | Profile>;
  postsDataLoader: DataLoader<string, null | Post[]>;
  membersDataLoader: DataLoader<string, null | MemberType>;
  followersDataLoader: DataLoader<string, null | User[]>;
  subsDataLoader: DataLoader<string, null | User[]>;
};
