import { PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../member-types/schemas.js';

export type IdArg = {
  id: string;
};

export type PrismaContext = {
  prisma: PrismaClient;
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
