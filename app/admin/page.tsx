"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // 🔐 SIMPLE ADMIN PASSWORD
  const handleLogin = () => {
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  // 📦 FETCH POSTS
  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  };

  // 📦 FETCH SUGGESTIONS
  const fetchSuggestions = async () => {
    const { data } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  };

  // ❌ DELETE POST
  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  // ✅ APPROVE SUGGESTION
  const approveSuggestion = async (id: string) => {
    await supabase
      .from("suggestions")
      .update({ approved: true })
      .eq("id", id);

    fetchSuggestions();
  };

  // ❌ DECLINE SUGGESTION
  const deleteSuggestion = async (id: string) => {
    await supabase.from("suggestions").delete().eq("id", id);
    fetchSuggestions();
  };

  useEffect(() => {
    if (!authenticated) return;

    fetchPosts();
    fetchSuggestions();
  }, [authenticated]);

  // 🔐 LOGIN SCREEN
  if (!authenticated) {
    return (
      <div style={{ padding: 40 }}>
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

  // 🛠 ADMIN DASHBOARD
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <h2>Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 20,
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <button
            onClick={() => deletePost(post.id)}
            style={{ background: "red", color: "white" }}
          >
            Delete Post
          </button>

          <h4 style={{ marginTop: 20 }}>Suggestions</h4>

          {suggestions
            .filter((s) => s.post_id === post.id)
            .map((s) => (
              <div
                key={s.id}
                style={{
                  border: "1px solid gray",
                  padding: 10,
                  marginTop: 10,
                }}
              >
                <p>{s.message}</p>
                <p>Status: {s.approved ? "✅ Approved" : "⏳ Pending"}</p>

                {!s.approved && (
                  <>
                    <button
                      onClick={() => approveSuggestion(s.id)}
                      style={{
                        background: "green",
                        color: "white",
                        marginRight: 10,
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => deleteSuggestion(s.id)}
                      style={{
                        background: "gray",
                        color: "white",
                      }}
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
      }
