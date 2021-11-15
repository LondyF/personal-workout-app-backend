import { Context } from "koa";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WORKOUTS = ["test", "test", "test"];

export default class WorkoutController {
  public static async getAllWorkouts(ctx: Context) {
    const workouts = await prisma.workout.findMany();

    ctx.body = workouts;
  }

  public static async addWorkout(ctx: Context) {
    const response = ctx.request.body;

    WORKOUTS.push(response.workout);

    ctx.body = WORKOUTS;
  }
}
