/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropIndex
DROP INDEX "public"."User_name_key";

-- AlterTable
ALTER TABLE "public"."Cart" ADD COLUMN     "products" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "public"."CartItem";

-- DropTable
DROP TABLE "public"."Product";

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Cart"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
