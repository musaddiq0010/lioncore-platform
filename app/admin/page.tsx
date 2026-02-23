"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    if (data.user) {
      fetchPosts();
      fetchSuggestions();
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

  async function declineSuggestion(id: string) {
    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  }

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <strong>{post.title}</strong>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}

      <h2>Suggestions</h2>
      {suggestions.map((s) => (
        <div key={s.id}>
          <p>{s.message}</p>
          {!s.approved && (
            <>
              <button onClick={() => approveSuggestion(s.id)}>
                Approve
              </button>
              <button onClick={() => declineSuggestion(s.id)}>
                Decline
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}  }

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
