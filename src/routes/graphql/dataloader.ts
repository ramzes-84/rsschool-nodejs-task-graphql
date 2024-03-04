import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export function usersDataLoader(prisma: PrismaClient) {
  new DataLoader(async (ids) => {
    const rows = await prisma.user.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });
    const sortedInIdsOrder = ids.map((id) => rows.find((x) => x.id === id));
    return sortedInIdsOrder;
  });
}

export function profilesDataLoader(prisma: PrismaClient) {
  new DataLoader(async (ids) => {
    const rows = await prisma.profile.findMany({
      where: {
        userId: {
          in: ids as string[],
        },
      },
    });
    const sortedInIdsOrder = ids.map((id) => rows.find((x) => x.id === id));
    return sortedInIdsOrder;
  });
}

export function postsDataLoader(prisma: PrismaClient) {
  new DataLoader(async (ids) => {
    const rows = await prisma.post.findMany({
      where: {
        authorId: {
          in: ids as string[],
        },
      },
    });
    const sortedInIdsOrder = ids.map((id) => rows.find((x) => x.id === id));
    return sortedInIdsOrder;
  });
}

export function membersDataLoader(prisma: PrismaClient) {
  new DataLoader(async (ids) => {
    const rows = await prisma.memberType.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });
    const sortedInIdsOrder = ids.map((id) => rows.find((x) => x.id === id));
    return sortedInIdsOrder;
  });
}

export function followersDataLoader(prisma: PrismaClient) {
  new DataLoader(async (ids) => {
    const rows = await prisma.subscribersOnAuthors.findMany({
      where: {
        authorId: { in: ids as string[] },
      },
      include: {
        subscriber: true,
      },
    });
    const sortedInIdsOrder = ids.map((id) => rows.find((x) => x.authorId === id));
    return sortedInIdsOrder;
  });
}

export function subsDataLoader(prisma: PrismaClient) {
  new DataLoader(async (ids) => {
    const rows = await prisma.subscribersOnAuthors.findMany({
      where: {
        subscriberId: { in: ids as string[] },
      },
      include: {
        author: true,
      },
    });
    const sortedInIdsOrder = ids.map((id) => rows.find((x) => x.subscriberId === id));
    return sortedInIdsOrder;
  });
}
