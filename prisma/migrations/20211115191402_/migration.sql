-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "workoutId" INTEGER;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
