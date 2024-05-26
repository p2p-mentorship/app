/*
  Warnings:

  - Added the required column `address` to the `Mentor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "address" TEXT NOT NULL;
