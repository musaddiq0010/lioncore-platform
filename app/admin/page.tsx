"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    checkSession();
    fetchPosts();
    fetchSuggestions();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  }

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

  async function login(email: string, password: string) {
    await supabase.auth.signInWithPassword({ email, password });
    checkSession();
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function createPost() {
    if (!title || !content) return alert("Fill all fields");

    await supabase.from("posts").insert([{ title, content }]);

    setTitle("");
    setContent("");
    fetchPosts();
  }

  async function deletePost(id: string) {
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  }

  async function approveSuggestion(id: string) {
    await supabase
      .from("suggestions")
      .update({ status: "approved" })
      .eq("id", id);

    fetchSuggestions();
  }

  async function declineSuggestion(id: string) {
    await supabase
      .from("suggestions")
      .update({ status: "declined" })
      .eq("id", id);

    fetchSuggestions();
  }

  async function deleteSuggestion(id: string) {
    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  }

  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Login</h2>
        <input
          placeholder="Email"
          onBlur={(e) => (window.email = e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onBlur={(e) => (window.password = e.target.value)}
        />
        <br /><br />
        <button
          onClick={() => login(window.email, window.password)}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>

      <hr />

      <h2>Create Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br /><br />
      <button onClick={createPost}>Upload Post</button>

      <hr />

      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => deletePost(post.id)}>Delete</button>
          <hr />
        </div>
      ))}

      <h2>All Suggestions</h2>
      {suggestions.map((s) => (
        <div key={s.id}>
          <p>{s.content}</p>
          <p>Status: {s.status}</p>

          <button onClick={() => approveSuggestion(s.id)}>Approve</button>
          <button onClick={() => declineSuggestion(s.id)}>Decline</button>
          <button onClick={() => deleteSuggestion(s.id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
            }
