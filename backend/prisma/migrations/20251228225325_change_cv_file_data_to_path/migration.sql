/*
  Warnings:

  - You are about to drop the column `cvFileData` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `cvFileData` on the `UserSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "cvFileData",
ADD COLUMN     "cvFilePath" TEXT;

-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "cvFileData",
ADD COLUMN     "cvFilePath" TEXT;
