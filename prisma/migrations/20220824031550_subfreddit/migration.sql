/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Posts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SubFreddit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT,
    "bannerUrl" TEXT,
    "creatorName" TEXT NOT NULL,
    CONSTRAINT "SubFreddit_creatorName_fkey" FOREIGN KEY ("creatorName") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "votesCount" INTEGER,
    "identifier" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postsId" TEXT,
    "subFredditId" TEXT,
    CONSTRAINT "Post_subFredditId_fkey" FOREIGN KEY ("subFredditId") REFERENCES "SubFreddit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("dateCreated", "description", "id", "identifier", "postsId", "title", "votesCount") SELECT "dateCreated", "description", "id", "identifier", "postsId", "title", "votesCount" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_identifier_key" ON "Post"("identifier");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "SubFreddit_name_key" ON "SubFreddit"("name");

-- CreateIndex
CREATE INDEX "SubFreddit_name_idx" ON "SubFreddit"("name");
