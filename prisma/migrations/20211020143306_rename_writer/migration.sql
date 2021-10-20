/*
  Warnings:

  - The values [PUBLISHER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `publisherId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Publisher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PublisherToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `writerId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WriterType" AS ENUM ('PERSONAL', 'ORGANIZATION');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'WRITER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_publisherId_fkey";

-- DropForeignKey
ALTER TABLE "_PublisherToUser" DROP CONSTRAINT "_PublisherToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PublisherToUser" DROP CONSTRAINT "_PublisherToUser_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "publisherId",
ADD COLUMN     "writerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Publisher";

-- DropTable
DROP TABLE "_PublisherToUser";

-- DropEnum
DROP TYPE "PublisherType";

-- CreateTable
CREATE TABLE "Writer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "type" "WriterType" NOT NULL DEFAULT E'PERSONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWriter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Writer_name_key" ON "Writer"("name");

-- CreateIndex
CREATE INDEX "Writer_name_idx" ON "Writer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWriter_AB_unique" ON "_UserToWriter"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWriter_B_index" ON "_UserToWriter"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "Writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWriter" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWriter" ADD FOREIGN KEY ("B") REFERENCES "Writer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
