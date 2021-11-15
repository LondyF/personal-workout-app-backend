import Router from "@koa/router";

import { workout } from "controllers";

const workoutRouter = new Router({
  prefix: "/workout",
});

workoutRouter.get("/", workout.getAllWorkouts);
workoutRouter.post("/", workout.addWorkout);
workoutRouter.post("/add_exercise", workout.addExerciseToWorkout);

export default workoutRouter;
