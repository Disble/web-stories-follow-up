-- CreateEnum
CREATE TYPE "LogStatus" AS ENUM ('SUCCESS', 'ERROR', 'WARNING');

-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('SCRAPE_START', 'SCRAPE_COMPLETE', 'CHAPTER_CREATE', 'CHAPTER_UPDATE', 'CHAPTER_DELETE', 'FACEBOOK_PUBLISH', 'CRON_JOB_HISTORY_GET', 'CRON_START', 'CRON_COMPLETE', 'API_REQUEST', 'ERROR');

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "action" "LogAction" NOT NULL,
    "status" "LogStatus" NOT NULL DEFAULT 'SUCCESS',
    "message" TEXT NOT NULL,
    "details" JSONB,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "httpStatus" INTEGER,
    "error" JSONB,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_source_action_idx" ON "Log"("source", "action");

-- CreateIndex
CREATE INDEX "Log_status_idx" ON "Log"("status");

-- CreateIndex
CREATE INDEX "Log_startTime_idx" ON "Log"("startTime");
