"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);

    if (data.session) {
      fetchSuggestions();
    }
  }

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      location.reload();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  async function uploadPost() {
    const { error } = await supabase.from("posts").insert([
      { title, content },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Post uploaded");
      setTitle("");
      setContent("");
    }
  }

  async function fetchSuggestions() {
    const { data } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setSuggestions(data);
  }

  async function approve(id: number) {
    await supabase
      .from("suggestions")
      .update({ status: "approved" })
      .eq("id", id);

    fetchSuggestions();
  }

  async function decline(id: number) {
    await supabase
      .from("suggestions")
      .update({ status: "declined" })
      .eq("id", id);

    fetchSuggestions();
  }

  async function deleteSuggestion(id: number) {
    await supabase
      .from("suggestions")
      .delete()
      .eq("id", id);

    fetchSuggestions();
  }

  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Admin Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <hr />

      <h2>Upload Post</h2>

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

      <button onClick={uploadPost}>Upload</button>

      <hr />

      <h2>Suggestions</h2>

      {suggestions.map((s) => (
        <div key={s.id} style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
          <p><b>{s.title}</b></p>
          <p>{s.content}</p>
          <p>Status: {s.status}</p>

          <button onClick={() => approve(s.id)}>Approve</button>
          <button onClick={() => decline(s.id)}>Decline</button>
          <button onClick={() => deleteSuggestion(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
      }
