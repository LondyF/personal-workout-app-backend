/*
  Warnings:

  - The primary key for the `ExercisesWorkoutSetLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ExerciseSetLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `setId` to the `ExercisesWorkoutSetLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSetLink" DROP CONSTRAINT "ExerciseSetLink_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseSetLink" DROP CONSTRAINT "ExerciseSetLink_setId_fkey";

-- AlterTable
ALTER TABLE "ExercisesWorkoutSetLink" DROP CONSTRAINT "ExercisesWorkoutSetLink_pkey",
ADD COLUMN     "setId" INTEGER NOT NULL,
ADD CONSTRAINT "ExercisesWorkoutSetLink_pkey" PRIMARY KEY ("exerciseId", "workoutId", "setId");

-- DropTable
DROP TABLE "ExerciseSetLink";

-- AddForeignKey
ALTER TABLE "ExercisesWorkoutSetLink" ADD CONSTRAINT "ExercisesWorkoutSetLink_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
