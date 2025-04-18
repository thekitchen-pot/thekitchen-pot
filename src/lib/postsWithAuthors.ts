import authors from "../data/author.json";
import { getCollection } from "astro:content";

const posts = await getCollection("blog");

const postsWithAuthors = posts.map((post) => {
  const author = authors.find((a) => a.authorId === post.data.author);
  return {
    ...post,
    author,
  };
});
export default postsWithAuthors;
