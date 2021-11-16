-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "isPersonalRecord" BOOLEAN NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
