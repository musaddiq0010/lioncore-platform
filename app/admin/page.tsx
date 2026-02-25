"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const ADMIN_EMAIL = "your-email@gmail.com"; // CHANGE THIS

  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (data.user?.email === ADMIN_EMAIL) {
      setUser(data.user);
      fetchPosts();
      fetchSuggestions();
    } else {
      await supabase.auth.signOut();
      setUser(null);
    }
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      checkUser();
    }
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
      .eq("approved", false)
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  }

  async function createPost() {
    if (!title || !content) return;

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
      .update({ approved: true })
      .eq("id", id);

    fetchSuggestions();
  }

  async function deleteSuggestion(id: string) {
    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3>Create Post</h3>
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

      <h3>Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>Delete</button>
          <hr />
        </div>
      ))}

      <h3>Pending Suggestions</h3>
      {suggestions.map((s) => (
        <div key={s.id}>
          <p>{s.message}</p>
          <button onClick={() => approveSuggestion(s.id)}>Approve</button>
          <button onClick={() => deleteSuggestion(s.id)}>Decline</button>
          <hr />
        </div>
      ))}
    </div>
  );
    }
