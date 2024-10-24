/*
  Warnings:

  - A unique constraint covering the columns `[novelId,isPreferred]` on the table `NovelPlatform` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NovelPlatform" ADD COLUMN     "isPreferred" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "NovelPlatform_novelId_isPreferred_key" ON "NovelPlatform"("novelId", "isPreferred");
