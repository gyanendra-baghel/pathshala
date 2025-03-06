/*
  Warnings:

  - A unique constraint covering the columns `[studentId,subjectId,slot,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slot` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "slot" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_subjectId_slot_date_key" ON "Attendance"("studentId", "subjectId", "slot", "date");
