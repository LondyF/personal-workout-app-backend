import { Prisma } from "@prisma/client";

export const exercisesWithSetsAndTargetMuscle =
  Prisma.validator<Prisma.ExercisesWorkoutSetLinkArgs>()({
    include: {
      set: true,
      excersie: {
        include: {
          targetMuscle: true,
        },
      },
    },
  });
