/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telegramUsername` to the `Query` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_ownerAddress_fkey";

-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "resolved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "telegramUsername" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
