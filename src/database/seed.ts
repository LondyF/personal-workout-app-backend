import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding database");

  for (let i = 0; i < 5; i++) {
    const workout = await prisma.workout.create({
      data: {},
    });

    console.log(`Created Workout with id: ${workout.id}`);
  }

  console.log("Finished seeding database");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
