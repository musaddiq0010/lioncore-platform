"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 🔐 Listen for auth state
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          fetchPosts();
          fetchSuggestions();
        }
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setEmail("");
    setPassword("");
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

  async function handleCreatePost() {
    if (!title || !content) return;

    await supabase.from("posts").insert([
      {
        title,
        content,
      },
    ]);

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
      .update({ approved: true })
      .eq("id", id);

    fetchSuggestions();
  }

  async function deleteSuggestion(id: string) {
    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  }

  // 🔒 If NOT logged in → show login
  if (!user) {
    return (
      <div>
        <h1>Admin Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  // 🔥 Logged In → Show Dashboard
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

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
      <button onClick={handleCreatePost}>Upload Post</button>

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}

      <h2>Suggestions</h2>
      {suggestions.map((s) => (
        <div key={s.id}>
          <p>{s.message}</p>
          <button onClick={() => approveSuggestion(s.id)}>
            Approve
          </button>
          <button onClick={() => deleteSuggestion(s.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
         }
