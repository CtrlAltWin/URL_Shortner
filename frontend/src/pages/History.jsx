import { useEffect, useState } from "react";
import UrlCard from "../components/UrlCard";
import StatCard from "../components/StatCard";
import { BarChartBig } from "lucide-react";
import Shimmer from "../components/Shimmer";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function History() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    shortUrlsCount: 0,
    totalClicks: 0,
    avgClicks: 0,
  });

  useEffect(() => {
    async function fetchUrls() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/history`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch URLs");
          setUrls([]);
        } else {
          const fetchedUrls = data.urls || [];
          setUrls(fetchedUrls);

          // Calculate stats
          const shortUrlsCount = fetchedUrls.length;
          const totalClicks = fetchedUrls.reduce(
            (acc, url) => acc + (url.visitedCount || 0),
            0
          );
          const avgClicks = shortUrlsCount
            ? Math.round(totalClicks / shortUrlsCount)
            : 0;

          setStats({ shortUrlsCount, totalClicks, avgClicks });
        }
      } catch (err) {
        setError("Network error");
        setUrls([]);
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      fetchUrls();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Shimmer />;

  return (
    <div className="flex flex-col gap-10 min-h-[calc(100vh-5rem)] justify-center items-center py-8 px-4 sm:px-8">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-2 border text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
          <BarChartBig size={40} />
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-bold text-4xl">
          Admin Dashboard
        </div>
        <p className="text-lg text-gray-600">
          Monitor your shortened URLs and track performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-[1100px] w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Short URLs" value={stats.shortUrlsCount} />
        <StatCard title="Total Visits" value={stats.totalClicks} />
        <StatCard title="Avg Visits" value={stats.avgClicks} />
      </div>

      {/* Url Cards container */}
      <div className="max-w-[1100px] w-full mx-auto rounded-md">
        <h1 className="text-xl font-semibold mb-6 text-gray-700">
          All Shortened URLs
        </h1>

        {error && <p className="text-red-600">{error}</p>}

        <div className="space-y-3">
          {!loading && !error && urls.length === 0 && <p>No URLs found.</p>}
          {!loading &&
            !error &&
            urls.length > 0 &&
            urls.map((url) => <UrlCard key={url._id} url={url} />)}
        </div>
      </div>
    </div>
  );
}
