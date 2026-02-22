export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🦁 LionCore Platform
      </h1>

      <p className="text-center mb-10 text-gray-400">
        A platform for ideas, posts, suggestions and community voice.
      </p>

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <a
          href="/admin"
          className="bg-yellow-500 text-black p-3 rounded text-center font-semibold"
        >
          Admin Panel
        </a>

        <a
          href="/posts"
          className="bg-white text-black p-3 rounded text-center font-semibold"
        >
          View Posts
        </a>

        <a
          href="/suggest"
          className="bg-gray-700 p-3 rounded text-center font-semibold"
        >
          Write Suggestion
        </a>
      </div>
    </main>
  );
}
