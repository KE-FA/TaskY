-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
