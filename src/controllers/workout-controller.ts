import { Context } from "koa";

import { PrismaClient } from "@prisma/client";

import { groupSetsPerExercise, groupSetsPerMuscleGroup } from "utils";

const prisma = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

export default class WorkoutController {
  public static async getAllWorkouts(ctx: Context) {
    const allWorkouts = await prisma.workout.findMany({
      where: {
        userId: 1,
      },
      include: {
        exercises: {
          include: {
            set: true,
            excersie: {
              include: {
                targetMuscle: true,
              },
            },
          },
        },
      },
    });

    const workouts = allWorkouts.map((workout) => {
      const groupedSets = groupSetsPerExercise(workout.exercises);
      const exercises = groupSetsPerMuscleGroup(groupedSets);

      return {
        ...workout,
        exercises,
      };
    });

    ctx.body = workouts;
  }
  public static async getWorkoutById(ctx: Context) {
    const { id } = ctx.params;
    const workout = await prisma.workout.findUnique({
      rejectOnNotFound: true,
      include: {
        exercises: {
          include: {
            set: true,
            excersie: {
              include: {
                targetMuscle: true,
              },
            },
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    const groupedSets = groupSetsPerExercise(workout.exercises);
    const exercises = groupSetsPerMuscleGroup(groupedSets);

    ctx.body = {
      ...workout,
      exercises,
    };
  }

  public static async getWorkoutOverviewById(ctx: Context) {
    const { id } = ctx.params;
    const workout = await prisma.workout.findUnique({
      rejectOnNotFound: true,
      include: {
        exercises: {
          include: {
            excersie: {
              include: {
                targetMuscle: {},
              },
            },
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    // const muscleGroups = workout.exercises.map((x) => {
    //   return {
    //     // muscleGroup: x.excersie.targetMuscle,
    //     muscleGroupId: x.excersie.targetMuscleId,
    //     totalSets: x.excersie.targetMuscle.reduce((acc, curr) => {
    //       return curr.sets.reduce((ok, test) => {
    //         return ok + test.reps;
    //       }, 0);
    //     }, 0),
    //   };
    // });

    ctx.body = {
      // caloriesBurned: workout.caloriesBurned,
      // muscleGroups,
    };
  }

  public static async addWorkout(ctx: Context) {
    const response = ctx.request.body;

    // WORKOUTS.push(response.workout);

    // ctx.body = WORKOUTS;
  }

  public static async addExerciseToWorkout(ctx: Context) {
    const { workoutId, exerciseId } = ctx.request.body;

    const workout = await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        exercises: {
          create: [],
        },
      },
      include: {
        exercises: true,
      },
    });

    ctx.body = workout;
  }

  public static async addSetToExercise(ctx: Context) {
    const { workoutId, exerciseId, set } = ctx.request.body;

    const workout = await prisma.workout.update({
      data: {
        exercises: {
          create: {
            excersie: {
              connect: {
                id: exerciseId,
              },
            },
            set: {
              create: {
                ...set,
                isPersonalRecord: false,
              },
            },
          },
        },
      },
      where: {
        id: workoutId,
      },
    });

    ctx.body = workout;
  }
}
