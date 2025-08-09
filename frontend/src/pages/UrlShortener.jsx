import { useState } from "react";

export default function UrlShortener() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    if (!inputUrl) {
      setError("Please enter a URL");
      return;
    }
    setLoading(true);
    //make a env
    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirectUrl: inputUrl }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        setError(data.error || "Failed to shorten URL");
      } else {
        setShortUrl(data.shortUrl);
        setInputUrl("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Shorten a URL</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter URL to shorten"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {shortUrl && (
        <div className="mt-6 text-blue-600 underline cursor-pointer flex items-center space-x-2">
          <a href={shortUrl} target="_blank" rel="noreferrer" className="break-all">
            {shortUrl}
          </a>
          <button
            onClick={copyToClipboard}
            className="bg-blue-200 hover:bg-blue-300 text-blue-800 rounded px-2 py-1 text-sm"
            aria-label="Copy short URL"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
