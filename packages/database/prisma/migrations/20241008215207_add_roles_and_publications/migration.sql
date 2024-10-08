/*
  Warnings:

  - You are about to drop the column `text` on the `Publication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPublishedFacebook]` on the table `Publication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "text",
ADD COLUMN     "idPublishedFacebook" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "publishedFacebook" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scheduledPublishTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_key" ON "Parameter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_idPublishedFacebook_key" ON "Publication"("idPublishedFacebook");
