/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArticleCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleCategories" DROP CONSTRAINT "_ArticleCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleCategories" DROP CONSTRAINT "_ArticleCategories_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_ArticleCategories";
