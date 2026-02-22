"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
  fetchPosts();
  fetchSuggestions();

  const postChannel = supabase
    .channel("posts-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "posts" },
      () => {
        fetchPosts();
      }
    )
    .subscribe();

  const suggestionChannel = supabase
    .channel("suggestions-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "suggestions" },
      () => {
        fetchSuggestions();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(postChannel);
    supabase.removeChannel(suggestionChannel);
  };
}, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  }

  async function fetchSuggestions() {
    const { data } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  }

  async function handleSubmit(postId: string) {
    const message = messages[postId];
    if (!message) return;

    await supabase.from("suggestions").insert([
      {
        post_id: postId,
        message,
      },
    ]);

    setMessages({ ...messages, [postId]: "" });
    fetchSuggestions();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lioncore Platform</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 20,
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <hr />

          <h4>Suggestions:</h4>

          {suggestions
            .filter((s) => s.post_id === post.id && s.approved === true)
            .map((s) => (
              <p key={s.id}>• {s.message}</p>
            ))}

          <br />

          <input
            type="text"
            placeholder="Write your suggestion..."
            value={messages[post.id] || ""}
            onChange={(e) =>
              setMessages({ ...messages, [post.id]: e.target.value })
            }
          />

          <button onClick={() => handleSubmit(post.id)}>
            Submit
          </button>
        </div>
      ))}
    </div>
  );
             }
