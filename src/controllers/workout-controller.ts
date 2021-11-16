import { Context } from "koa";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class WorkoutController {
  public static async getAllWorkouts(ctx: Context) {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: {
          include: {
            excersie: {
              include: {
                targetMuscle: {
                  include: {
                    Exercise: {
                      include: {
                        sets: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    ctx.body = workouts;
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
          create: [
            {
              excersie: {
                connect: {
                  id: exerciseId,
                },
              },
            },
          ],
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

    const lok = await prisma.exercise.update({
      where: {
        id: exerciseId,
      },
      data: {
        sets: {
          create: [
            {
              ...set,
            },
          ],
        },
      },
      include: {
        sets: true,
      },
    });

    ctx.body = lok;
  }
}
