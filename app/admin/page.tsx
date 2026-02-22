"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (loading) return; // prevent double click
    setLoading(true);

    const { error } = await supabase.from("posts").insert([
      { title, content },
    ]);

    if (error) {
      alert("Error uploading post");
      setLoading(false);
      return;
    }

    alert("Post uploaded successfully!");

    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

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
    </div>
  );
  }
