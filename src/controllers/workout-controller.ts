import { Context } from "koa";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class WorkoutController {
  public static async getAllWorkouts(ctx: Context) {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: true,
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
          connect: {
            exerciseId_workoutId: {
              workoutId: workoutId,
              exerciseId: exerciseId,
            },
          },
        },
      },
    });

    ctx.body = workout;
  }
}
