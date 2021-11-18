import { Context } from "koa";

import { PrismaClient } from "@prisma/client";

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
    // const test = await prisma.set.findMany({
    //   include: {

    //   }
    // })

    const a = await prisma.workout.findMany({
      where: {
        userId: 1,
      },
      include: {
        user: true,
        exercises: {
          include: {
            set: true,
            excersie: true,
          },
        },
      },
    });

    ctx.body = a;
  }
  public static async getWorkoutById(ctx: Context) {
    const { id } = ctx.params;
    const workout = await prisma.workout.findUnique({
      rejectOnNotFound: true,
      where: {
        id: Number(id),
      },
    });

    ctx.body = workout;
  }

  // {
  //   calBurned: 10,
  //   muscleGroups: [
  //     {
  //       totalSets: 1,
  //       totalReps: 1,
  //       lastSetWeight: 10,
  //       lastSetReps: 10,
  //     }
  //   ]
  // }

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
    const { exerciseId, set } = ctx.request.body;

    // const lok = await prisma.workout.update({
    //   where: {
    //     id: 1,
    //   },
    //   data: {
    //     exercises: {
    //       connectOrCreate: {
    //         where: {
    //           exerciseId_workoutId: exerciseId,
    //         },
    //       },
    //     },
    //   },
    // });

    // const lok = "OK";

    ctx.body = "ok";
  }
}
