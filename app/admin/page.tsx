"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // SIMPLE PASSWORD PROTECTION
  const handleLogin = () => {
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  // FETCH POSTS
  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  };

  // FETCH SUGGESTIONS
  const fetchSuggestions = async () => {
    const { data } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  };

  useEffect(() => {
    if (!authenticated) return;

    fetchPosts();
    fetchSuggestions();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 10 }}>
          <strong>{post.title}</strong>
          <p>{post.content}</p>
        </div>
      ))}

      <h2>Suggestions</h2>
      {suggestions.length === 0 && <p>No suggestions yet</p>}

      {suggestions.map((s) => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <p>
            <strong>Post ID:</strong> {s.post_id}
          </p>
          <p>{s.message}</p>
          <hr />
        </div>
      ))}
    </div>
  );
      }
