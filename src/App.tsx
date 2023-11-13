import { type ReactNode, useEffect, useState } from "react";
import get from "./util/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImage from "../src/assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type rawBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
function App() {
  const [posts, setPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  const getPosts = async () => {
    setIsFetching(true);
    try {
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
    } catch (error) {
      setError((error as Error).message);
    }

    setIsFetching(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (posts) {
    content = <BlogPosts posts={posts} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback"> Fetching posts... </p>;
  }
  return (
    <main>
      <img src={fetchingImage} alt="fetch image" />
      {content}
    </main>
  );
}

export default App;
