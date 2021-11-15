/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "workoutId";

-- CreateTable
CREATE TABLE "ExercisesWorkoutLink" (
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExercisesWorkoutLink_pkey" PRIMARY KEY ("exerciseId","workoutId")
);

-- AddForeignKey
ALTER TABLE "ExercisesWorkoutLink" ADD CONSTRAINT "ExercisesWorkoutLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesWorkoutLink" ADD CONSTRAINT "ExercisesWorkoutLink_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
