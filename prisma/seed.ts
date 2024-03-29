import createPrismaClient from '~/db.server';
const prisma = await createPrismaClient(null);

async function main() {
  await prisma.counter.create({
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
    await prisma.$disconnect();
  });
