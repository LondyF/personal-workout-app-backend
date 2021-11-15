import Router from "@koa/router";

import { workout } from "controllers";

const workoutRouter = new Router({
  prefix: "/workout",
});

workoutRouter.get("/", workout.getAllWorkouts);
workoutRouter.post("/", workout.addWorkout);

export default workoutRouter;
