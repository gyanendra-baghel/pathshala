/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,studentId]` on the table `SubjectStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SubjectWorkType" AS ENUM ('ASSIGNMENT', 'MATERIAL');

-- CreateTable
CREATE TABLE "SubjectWork" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "SubjectWorkType" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectWork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectStudent_subjectId_studentId_key" ON "SubjectStudent"("subjectId", "studentId");

-- AddForeignKey
ALTER TABLE "SubjectWork" ADD CONSTRAINT "SubjectWork_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
