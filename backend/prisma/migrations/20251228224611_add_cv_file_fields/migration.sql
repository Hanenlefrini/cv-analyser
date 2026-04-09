-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "cvFileData" TEXT,
ADD COLUMN     "cvFileName" TEXT,
ADD COLUMN     "cvMimeType" TEXT;

-- AlterTable
ALTER TABLE "UserSession" ADD COLUMN     "cvFileData" TEXT,
ADD COLUMN     "cvFileName" TEXT,
ADD COLUMN     "cvMimeType" TEXT;
