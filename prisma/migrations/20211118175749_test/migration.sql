/*
  Warnings:

  - The primary key for the `ExercisesWorkoutSetLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `setId` on the `ExercisesWorkoutSetLink` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExercisesWorkoutSetLink" DROP CONSTRAINT "ExercisesWorkoutSetLink_setId_fkey";

-- AlterTable
ALTER TABLE "ExercisesWorkoutSetLink" DROP CONSTRAINT "ExercisesWorkoutSetLink_pkey",
DROP COLUMN "setId",
ADD CONSTRAINT "ExercisesWorkoutSetLink_pkey" PRIMARY KEY ("exerciseId", "workoutId");

-- CreateTable
CREATE TABLE "ExerciseSetLink" (
    "exerciseId" INTEGER NOT NULL,
    "setId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseSetLink_pkey" PRIMARY KEY ("exerciseId","setId")
);

-- AddForeignKey
ALTER TABLE "ExerciseSetLink" ADD CONSTRAINT "ExerciseSetLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSetLink" ADD CONSTRAINT "ExerciseSetLink_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
