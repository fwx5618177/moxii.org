import { getAllPosts } from "@/lib/getAllPosts";
import { Feed } from "feed";

export default async function generateRssFeed(_req, res) {
  const posts = await getAllPosts();

  const feed = new Feed({
    title: "Your Site's Title",
    description: "This is my personal feed!",
    id: "https://yoursite.com/",
    link: "https://yoursite.com/",
    language: "en",
    feedLinks: {
      rss2: "https://yoursite.com/rss.xml",
    },
    author: {
      name: "Your Name",
      email: "Your Email",
      link: "https://yourlink.com",
    },
    copyright: "",
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.metadata.title,
      id: post.id,
      link: `https://yoursite.com/posts/${post.metadata.slug}`,
      description: post.metadata.description,
      content: post.content,
      date: new Date(post.metadata.date),
    });
  });

  res.setHeader("Content-Type", "application/rss+xml");
  res.write(feed.rss2());
  res.end();
}
