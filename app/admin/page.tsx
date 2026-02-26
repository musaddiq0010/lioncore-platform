"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    if (data.user) fetchPosts();
  }

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else checkUser();
  }

  async function logout() {
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

  async function createPost() {
    if (!imageFile) {
      alert("Select image");
      return;
    }

    const fileName = Date.now() + "-" + imageFile.name;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(fileName);

    await supabase.from("posts").insert({
      title,
      content,
      image_url: data.publicUrl,
    });

    setTitle("");
    setContent("");
    setImageFile(null);
    fetchPosts();
    alert("Post created!");
  }

  async function deletePost(id: number) {
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  }

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

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
      <input
        type="file"
        onChange={(e) =>
          setImageFile(e.target.files ? e.target.files[0] : null)
        }
      />
      <br /><br />
      <button onClick={createPost}>Post</button>

      <hr />

      <h3>All Posts</h3>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <h4>{post.title}</h4>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
      }
