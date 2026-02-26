"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: postData } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: commentData } = await supabase
      .from("comments")
      .select("*");

    setPosts(postData || []);
    setComments(commentData || []);
  }

  async function submitComment(postId: number) {
    if (!name || !comment) return alert("Fill all fields");

    await supabase.from("comments").insert([
      {
        post_id: postId,
        name,
        comment,
      },
    ]);

    setName("");
    setComment("");
    fetchData();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Lioncore Platform</h1>

      {posts.map((post) => {
        const postComments = comments.filter(
          (c) => c.post_id === post.id
        );

        return (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 20,
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            {post.image_url && (
              <img
                src={post.image_url}
                style={{ width: "100%", maxWidth: 400 }}
              />
            )}

            <br />

            <button
              onClick={() =>
                navigator.share({
                  title: post.title,
                  text: post.content,
                  url: window.location.href,
                })
              }
            >
              Share
            </button>

            <h3>Comments</h3>

            {postComments.map((c) => (
              <div key={c.id}>
                <strong>{c.name}</strong>
                <p>{c.comment}</p>
              </div>
            ))}

            <h4>Add Comment</h4>

            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ display: "block", marginBottom: 5 }}
            />

            <textarea
              placeholder="Write comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ display: "block", marginBottom: 5 }}
            />

            <button onClick={() => submitComment(post.id)}>
              Comment
            </button>
          </div>
        );
      })}
    </div>
  );
                      }
