"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: suggestionsData, error: suggestionsError } =
      await supabase
        .from("suggestions")
        .select("*")
        .order("created_at", { ascending: false });

    if (postsError) console.log(postsError);
    if (suggestionsError) console.log(suggestionsError);

    setPosts(postsData || []);
    setSuggestions(suggestionsData || []);
    setLoading(false);
  }

  async function approveSuggestion(id: number) {
    await supabase
      .from("suggestions")
      .update({ status: "approved" })
      .eq("id", id);

    fetchData();
  }

  async function declineSuggestion(id: number) {
    await supabase
      .from("suggestions")
      .update({ status: "declined" })
      .eq("id", id);

    fetchData();
  }

  async function deleteSuggestion(id: number) {
    await supabase
      .from("suggestions")
      .delete()
      .eq("id", id);

    fetchData();
  }

  async function deletePost(id: number) {
    await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    fetchData();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {loading && <p>Loading...</p>}

      <h2>Posts</h2>
      {posts.length === 0 && <p>No posts found</p>}
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}

      <h2>Suggestions</h2>
      {suggestions.length === 0 && <p>No suggestions found</p>}
      {suggestions.map((s) => (
        <div key={s.id} style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
          <h3>{s.title}</h3>
          <p>{s.content}</p>
          <p>Status: {s.status}</p>

          <button onClick={() => approveSuggestion(s.id)}>Approve</button>
          <button onClick={() => declineSuggestion(s.id)}>Decline</button>
          <button onClick={() => deleteSuggestion(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
    }
