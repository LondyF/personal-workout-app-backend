/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the `ExercisesWorkoutLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExercisesWorkoutLink" DROP CONSTRAINT "ExercisesWorkoutLink_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExercisesWorkoutLink" DROP CONSTRAINT "ExercisesWorkoutLink_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseId";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "ExercisesWorkoutLink";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercisesWorkoutSetLink" (
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "setId" INTEGER NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExercisesWorkoutSetLink_pkey" PRIMARY KEY ("exerciseId","workoutId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesWorkoutSetLink" ADD CONSTRAINT "ExercisesWorkoutSetLink_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesWorkoutSetLink" ADD CONSTRAINT "ExercisesWorkoutSetLink_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercisesWorkoutSetLink" ADD CONSTRAINT "ExercisesWorkoutSetLink_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
