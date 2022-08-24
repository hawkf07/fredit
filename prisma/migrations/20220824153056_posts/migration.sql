/*
  Warnings:

  - Added the required column `authorName` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_PostToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PostToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "votesCount" INTEGER NOT NULL DEFAULT 0,
    "identifier" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postsId" TEXT,
    "authorName" TEXT,
    "subFredditId" TEXT,
    CONSTRAINT "Post_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_subFredditId_fkey" FOREIGN KEY ("subFredditId") REFERENCES "SubFreddit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("dateCreated", "description", "id", "identifier", "postsId", "subFredditId", "title", "votesCount") SELECT "dateCreated", "description", "id", "identifier", "postsId", "subFredditId", "title", coalesce("votesCount", 0) AS "votesCount" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_identifier_key" ON "Post"("identifier");
CREATE UNIQUE INDEX "Post_authorName_key" ON "Post"("authorName");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "commentId" TEXT,
    "postId" TEXT,
    CONSTRAINT "User_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("commentId", "email", "emailVerified", "id", "image", "name", "postId") SELECT "commentId", "email", "emailVerified", "id", "image", "name", "postId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commentText" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "postId" TEXT,
    CONSTRAINT "Comment_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("commentText", "id", "postId") SELECT "commentText", "id", "postId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE UNIQUE INDEX "Comment_authorName_key" ON "Comment"("authorName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PostToUser_AB_unique" ON "_PostToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToUser_B_index" ON "_PostToUser"("B");
