import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "First Post", body: "This is the first post" },
  { id: 2, title: "Second Post", body: "This is the second post" },
];
function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function App() {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPost = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (postsQuery.isError) {
    return (
      <div className="App">
        <pre>{JSON.stringify(postsQuery.error)}</pre>
      </div>
    );
  }

  return (
    <div className="App">
      {postsQuery.data.map((post) => (
        <div key={post.id}> {post.title} </div>
      ))}

      <button
        disabled={newPost.isLoading}
        onClick={() => newPost.mutate("New Post")}
      >
        Add new
      </button>
    </div>
  );
}

export default App;
