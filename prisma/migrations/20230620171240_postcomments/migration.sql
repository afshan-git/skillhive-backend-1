/*
  Warnings:

  - Added the required column `content` to the `PostComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostComments" ADD COLUMN     "content" TEXT NOT NULL;
