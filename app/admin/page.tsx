"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handlePost(e: any) {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      alert("Error posting");
    } else {
      alert("Post created!");
      setTitle("");
      setContent("");
      setImageUrl("");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handlePost}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}
