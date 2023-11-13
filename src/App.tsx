import { useEffect, useState } from "react";
import get from "./util/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImage from "../src/assets/data-fetching.png";

type rawBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const getPosts = async () => {
    const data = (await get(
      "https://jsonplaceholder.typicode.com/posts"
    )) as rawBlogPosts[];

    const blogData: BlogPost[] = data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        text: item.body,
      };
    });

    setPosts(blogData);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main>
      <img src={fetchingImage} alt="fetch image" />
      <BlogPosts posts={posts} />
    </main>
  );
}

export default App;
