import fs from "fs";
import path from "path";
import { Posts, Post } from "Post";
import { parsePost } from "./parsePost";

const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPosts = async (): Promise<Posts> => {
  const filenames = fs.readdirSync(postsDirectory);
  const allPostsData: Posts = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, filename);
      try {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        return parsePost(slug, fileContents);
      } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return null;
      }
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (a.metadata.date < b.metadata.date) {
        return 1;
      } else if (a.metadata.date > b.metadata.date) {
        return -1;
      } else {
        return 0;
      }
    });

  return allPostsData;
};
