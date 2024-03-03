import { PrismaClient } from '@prisma/client';

export type IdArg = {
  id: string;
};

export type PrismaContext = {
  prisma: PrismaClient;
};

export type UserInit = {
  name: string;
  balance: number;
};
