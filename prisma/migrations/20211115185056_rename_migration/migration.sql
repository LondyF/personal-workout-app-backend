/*
  Warnings:

  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Workout` table. All the data in the column will be lost.
  - The `id` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "caloriesBurned" INTEGER,
ADD COLUMN     "dateExecuted" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "targetMuscleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_targetMuscleId_fkey" FOREIGN KEY ("targetMuscleId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
