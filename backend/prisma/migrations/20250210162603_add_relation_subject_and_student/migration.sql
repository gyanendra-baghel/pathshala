/*
  Warnings:

  - You are about to drop the column `gradeId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `FeeStructure` table. All the data in the column will be lost.
  - You are about to drop the `SubjectGrade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Fee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectGrade" DROP CONSTRAINT "SubjectGrade_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectGrade" DROP CONSTRAINT "SubjectGrade_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "SubjectGrade" DROP CONSTRAINT "SubjectGrade_teacherId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "gradeId",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Fee" ADD COLUMN     "description" TEXT,
ADD COLUMN     "schoolId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FeeStructure" DROP COLUMN "dueDate",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "gradeId" INTEGER;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "photo" TEXT;

-- DropTable
DROP TABLE "SubjectGrade";

-- CreateTable
CREATE TABLE "SubjectTeacher" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "SubjectTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectStudent" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "SubjectStudent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectTeacher" ADD CONSTRAINT "SubjectTeacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectTeacher" ADD CONSTRAINT "SubjectTeacher_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectTeacher" ADD CONSTRAINT "SubjectTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectStudent" ADD CONSTRAINT "SubjectStudent_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectStudent" ADD CONSTRAINT "SubjectStudent_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectStudent" ADD CONSTRAINT "SubjectStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
