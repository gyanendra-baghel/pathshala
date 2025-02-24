/*
  Warnings:

  - You are about to drop the column `amount` on the `FeeStructure` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `FeeStructure` table. All the data in the column will be lost.
  - You are about to drop the column `feeType` on the `FeeStructure` table. All the data in the column will be lost.
  - You are about to drop the column `gradeId` on the `FeeStructure` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `FeeStructure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `FeeStructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuitionFee` to the `FeeStructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeeStructure" DROP COLUMN "amount",
DROP COLUMN "description",
DROP COLUMN "feeType",
DROP COLUMN "gradeId",
ADD COLUMN     "libraryFee" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "mealFee" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "studentId" INTEGER NOT NULL,
ADD COLUMN     "transportFee" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "tuitionFee" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FeeStructure_studentId_key" ON "FeeStructure"("studentId");

-- AddForeignKey
ALTER TABLE "FeeStructure" ADD CONSTRAINT "FeeStructure_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
