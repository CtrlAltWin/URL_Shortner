import { Link } from "lucide-react";
import { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirectUrl: inputUrl }),
      });

      const data = await res.json();
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
    <div className="flex flex-col gap-10 h-[calc(100vh-5rem)] items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-2 border text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
          <Link size={40}/>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-bold text-4xl">
          URL Shortener
        </div>
        <p className="text-lg text-gray-600">Transform your long URLs into short, shareable links in seconds</p>
      </div>

      <div className="max-w-2xl w-full p-10 shadow-sm shadow-indigo-500 rounded-md">
        <h1 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          Shorten your URL
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="url"
            placeholder="Enter URL to shorten"
            className="w-full border border-gray-300 px-4 py-3 outline-offset-4 outline-indigo-500 text-sm sm:text-base rounded-md"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 w-full p-3 text-white font-semibold rounded-md"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>
        {error && (
          <p className="text-red-600 mt-4 text-center sm:text-left text-sm sm:text-base">
            {error}
          </p>
        )}

        {shortUrl && (
          <div className="mt-6 text-blue-600 cursor-pointer flex sm:items-center space-x-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="break-words text-center sm:text-left"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-blue-200 hover:bg-blue-300 text-blue-800 rounded px-3 py-1 text-sm"
              aria-label="Copy short URL"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
