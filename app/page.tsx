"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadData() {
    const { data: postsData } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: suggestionsData } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (postsData) setPosts(postsData);
    if (suggestionsData) setSuggestions(suggestionsData);
  }

  async function submitSuggestion(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    await supabase.from("suggestions").insert([{ message }]);
    setMessage("");
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>LionCore Platform</h1>

      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}

      <hr />

      <h2>Drop Suggestion</h2>
      <form onSubmit={submitSuggestion}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", height: 100 }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <hr />

      <h3>All Suggestions</h3>
      {suggestions.map((s) => (
        <p key={s.id}>• {s.message}</p>
      ))}
    </main>
  );
}
