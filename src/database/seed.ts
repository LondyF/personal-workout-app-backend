import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MUSCLE_GROUPS = ["Chest", "Back", "Arms", "Legs", "Shoulders"];
const EXERCISES = [
  "Bench Press",
  "Lat Pulldown",
  "Preacher Curls",
  "Leg Press",
  "Dumbell Shoulder Press",
];

async function main() {
  /*
    Seed for Muscle Groups
  */

  await prisma.muscleGroup.deleteMany();

  MUSCLE_GROUPS.forEach(async (x) => {
    const muscleGroup = await prisma.muscleGroup.create({
      data: {
        name: x,
        color: "red",
      },
    });

    console.log(`Created Muscle Group with id: ${muscleGroup.id}`);
  });

  /*
    Seed for Exercises
  */
  await prisma.exercise.deleteMany();

  EXERCISES.forEach(async (x, index) => {
    const exercise = await prisma.exercise.create({
      data: {
        name: x,
        targetMuscleId: index + 1,
      },
    });

    console.log(`Created Exercises with id: ${exercise.id}`);
  });

  /*
    Seed for Workout
  */
  await prisma.workout.deleteMany();

  EXERCISES.forEach(async (x, index) => {
    const exercise = await prisma.workout.create({
      data: {
        caloriesBurned: 12312,
      },
    });

    console.log(`Created Exercises with id: ${exercise.id}`);
  });

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
