/*
  Warnings:

  - The primary key for the `ExercisesWorkoutSetLink` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ExercisesWorkoutSetLink" DROP CONSTRAINT "ExercisesWorkoutSetLink_pkey",
ADD CONSTRAINT "ExercisesWorkoutSetLink_pkey" PRIMARY KEY ("exerciseId", "workoutId", "setId");
