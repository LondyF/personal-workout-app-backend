declare type ExercisesWithSetsAndTargetMuscle =
  import("@prisma/client").Prisma.ExercisesWorkoutSetLinkGetPayload<
    typeof import("./type-helpers").exercisesWithSetsAndTargetMuscle
  >[];
