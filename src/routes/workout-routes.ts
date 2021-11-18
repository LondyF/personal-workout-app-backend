import Router from "@koa/router";

import { workout } from "controllers";

const workoutRouter = new Router({
  prefix: "/workout",
});

workoutRouter.get("/", workout.getAllWorkouts);
workoutRouter.get("/:id", workout.getWorkoutById);
workoutRouter.get("/:id/overview", workout.getWorkoutOverviewById);
workoutRouter.post("/", workout.addWorkout);
workoutRouter.post("/exercises", workout.addExerciseToWorkout);
workoutRouter.post("/exercises/sets", workout.addSetToExercise);

export default workoutRouter;
