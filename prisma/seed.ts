import { prisma } from "~/db.server";

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
