import { useEffect, useState } from "react";

export default function History() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUrls() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/history"); // your backend endpoint to fetch all URLs
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch URLs");
        } else {
          setUrls(data.urls || []);
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchUrls();
  }, []);

  return (
    <div className="bg-white max-w-3xl mx-auto p-6 rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">History</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && urls.length === 0 && <p>No URLs found.</p>}

      {!loading && !error && urls.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="py-2 px-4">Original URL</th>
              <th className="py-2 px-4">Short URL</th>
              <th className="py-2 px-4">Visits</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(({ _id, redirectUrl, shortCode, visitedCount }) => (
              <tr
                key={_id}
                className="hover:bg-blue-50 border-b border-gray-200"
              >
                <td className="py-3 px-4 max-w-xs truncate" title={redirectUrl}>
                  <a
                    href={redirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-900 underline"
                  >
                    {redirectUrl}
                  </a>
                </td>
                <td className="py-3 px-4 text-blue-600 underline">
                  <a
                    href={`http://localhost:5000/${shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`http://localhost:5000/${shortCode}`}
                  </a>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
                    {visitedCount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
