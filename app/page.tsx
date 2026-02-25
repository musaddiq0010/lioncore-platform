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
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  }

  async function submitSuggestion(postId: string) {
    const message = messages[postId];
    if (!message) return;

    await supabase.from("suggestions").insert([
      {
        post_id: postId,
        message,
        approved: false,
      },
    ]);

    setMessages({ ...messages, [postId]: "" });
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lioncore Platform</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <h4>Suggestions</h4>
          {suggestions
            .filter((s) => s.post_id === post.id)
            .map((s) => (
              <p key={s.id}>• {s.message}</p>
            ))}

          <input
            placeholder="Write suggestion"
            value={messages[post.id] || ""}
            onChange={(e) =>
              setMessages({ ...messages, [post.id]: e.target.value })
            }
          />
          <button onClick={() => submitSuggestion(post.id)}>
            Submit
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
  }
