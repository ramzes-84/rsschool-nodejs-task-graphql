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
