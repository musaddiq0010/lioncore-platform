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

  // 🔐 Simple password login
  function handleLogin() {
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  }

  // 📥 Fetch Posts
  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  }

  // 📥 Fetch Suggestions
  async function fetchSuggestions() {
    const { data } = await supabase
      .from("suggestions")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  }

  // ➕ Upload Post
  async function handleUpload() {
    if (!title || !content) return;

    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Post uploaded");
      setTitle("");
      setContent("");
      fetchPosts();
    }
  }

  // ❌ Delete Post
  async function handleDelete(id: string) {
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  }

  // ✅ Approve Suggestion
  async function approveSuggestion(id: string) {
    await supabase
      .from("suggestions")
      .update({ approved: true })
      .eq("id", id);

    fetchSuggestions();
  }

  // ❌ Decline Suggestion
  async function declineSuggestion(id: string) {
    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  }

  useEffect(() => {
    if (!authenticated) return;

    fetchPosts();
    fetchSuggestions();
  }, [authenticated]);

  // 🔐 LOGIN SCREEN
  if (!authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  // 🛠 ADMIN DASHBOARD
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <h2>Upload New Post</h2>
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
      <button onClick={handleUpload}>Upload</button>

      <hr />

      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 10 }}>
          <strong>{post.title}</strong>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}

      <hr />

      <h2>Pending Suggestions</h2>
      {suggestions.map((sug) => (
        <div key={sug.id} style={{ marginBottom: 10 }}>
          <p>{sug.message}</p>
          <button onClick={() => approveSuggestion(sug.id)}>Approve</button>
          <button onClick={() => declineSuggestion(sug.id)}>Decline</button>
        </div>
      ))}
    </div>
  );
      }
