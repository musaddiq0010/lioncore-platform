"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {

  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const fetchSuggestions = async () => {
    const { data, error } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSuggestions(data);
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    fetchPosts();
    fetchSuggestions();

    const channel = supabase
      .channel("admin-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => fetchPosts()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "suggestions" },
        () => fetchSuggestions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
      <h1>Admin Panel</h1>

      <h2>Create Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={createPost}>Publish</button>

      <hr />

      <h2>All Suggestions</h2>

      {suggestions.map((s) => (
        <div
          key={s.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p>{s.message}</p>
          <p>
            Status:{" "}
            {s.approved ? (
              <span style={{ color: "green" }}>Approved</span>
            ) : (
              <span style={{ color: "red" }}>Pending</span>
            )}
          </p>

          {!s.approved && (
            <button onClick={() => approveSuggestion(s.id)}>
              Approve
            </button>
          )}

          <button onClick={() => deleteSuggestion(s.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
