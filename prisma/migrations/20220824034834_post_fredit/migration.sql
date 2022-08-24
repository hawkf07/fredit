/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubFreddit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT,
    "bannerUrl" TEXT,
    "creatorName" TEXT NOT NULL,
    CONSTRAINT "SubFreddit_creatorName_fkey" FOREIGN KEY ("creatorName") REFERENCES "User" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubFreddit" ("bannerUrl", "creatorName", "id", "imageUrl", "name", "title") SELECT "bannerUrl", "creatorName", "id", "imageUrl", "name", "title" FROM "SubFreddit";
DROP TABLE "SubFreddit";
ALTER TABLE "new_SubFreddit" RENAME TO "SubFreddit";
CREATE UNIQUE INDEX "SubFreddit_name_key" ON "SubFreddit"("name");
CREATE INDEX "SubFreddit_name_idx" ON "SubFreddit"("name");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "commentId" TEXT,
    "postId" TEXT,
    CONSTRAINT "User_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("commentId", "email", "emailVerified", "id", "image", "postId") SELECT "commentId", "email", "emailVerified", "id", "image", "postId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
