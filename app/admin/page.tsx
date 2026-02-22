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
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchPosts();
      fetchSuggestions();
    } else {
      alert("Wrong password");
    }
  };

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    await supabase.from("posts").insert([
      { title, content },
    ]);

    setTitle("");
    setContent("");
    fetchPosts();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  const approveSuggestion = async (id: string) => {
    await supabase
      .from("suggestions")
      .update({ approved: true })
      .eq("id", id);

    fetchSuggestions();
  };

  const deleteSuggestion = async (id: string) => {
    if (!confirm("Delete this suggestion?")) return;

    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  };

  if (!authenticated) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Admin Login</h1>
        <input
          type="password"
          placeholder="Enter admin password"
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </form>

      <hr />

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 15 }}>
          <strong>{post.title}</strong>
          <br />
          <button onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      ))}

      <hr />

      <h2>Pending Suggestions</h2>

      {suggestions
        .filter((s) => !s.approved)
        .map((s) => (
          <div key={s.id} style={{ marginBottom: 10 }}>
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
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </form>

      <hr />

      <h2>Existing Posts</h2>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 15 }}>
          <strong>{post.title}</strong>
          <br />
          <button onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
            }
