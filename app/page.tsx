"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  }

  async function submitSuggestion(postId: string) {
    const content = prompt("Write your suggestion");

    if (!content) return;

    await supabase.from("suggestions").insert([
      {
        content,
        post_id: postId,
        status: "pending",
      },
    ]);

    alert("Suggestion submitted");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Lioncore Platform</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>

          <button onClick={() => submitSuggestion(post.id)}>
            Write Suggestion
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
                                  }
