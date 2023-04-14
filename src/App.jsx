import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";

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
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
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
    </div>
  );
}

export default App;
