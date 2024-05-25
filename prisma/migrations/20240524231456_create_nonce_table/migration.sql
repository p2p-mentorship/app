/*
  Warnings:

  - You are about to drop the column `nonce` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nonce";

-- CreateTable
CREATE TABLE "NonceTable" (
    "address" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "NonceTable_pkey" PRIMARY KEY ("address")
);
