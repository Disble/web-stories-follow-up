/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Novel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Novel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "urlCoverProfile" TEXT;

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "urlCoverChapter" DROP NOT NULL,
ALTER COLUMN "publishedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Novel" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "NovelPlatform" (
    "novelId" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NovelPlatform_pkey" PRIMARY KEY ("novelId","platformId")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "urlCover" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_baseUrl_key" ON "Platform"("baseUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_code_key" ON "Platform"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Novel_slug_key" ON "Novel"("slug");

-- AddForeignKey
ALTER TABLE "NovelPlatform" ADD CONSTRAINT "NovelPlatform_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelPlatform" ADD CONSTRAINT "NovelPlatform_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
