import { localPrisma } from '~/db.server';

async function main() {
  await localPrisma.counter.create({
    data: {
      count: 1,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await localPrisma.$disconnect();
  });
