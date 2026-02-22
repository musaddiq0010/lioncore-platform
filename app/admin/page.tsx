"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function createPost(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert([{ title, content }]);

    if (error) {
      alert("Error creating post");
      console.log(error);
    } else {
      alert("Post created!");
      setTitle("");
      setContent("");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <form onSubmit={createPost}>
        <input
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", height: 150 }}
        />

        <br />
        <button type="submit">Publish</button>
      </form>
    </main>
  );
      }
