/*
  Warnings:

  - You are about to drop the column `isConfirmed` on the `Affiliate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Affiliate_isConfirmed_idx";

-- AlterTable
ALTER TABLE "Affiliate" DROP COLUMN "isConfirmed";
