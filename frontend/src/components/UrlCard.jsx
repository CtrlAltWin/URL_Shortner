import { Copy } from "lucide-react";
import React from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UrlCard = ({ url }) => {
  const { redirectUrl, shortCode, visitedCount } = url;

  const fullShortUrl = `${backendUrl}/${shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullShortUrl);
  };

  return (
    <div className="flex flex-col border border-gray-300 p-6 rounded-lg space-y-2 hover:bg-slate-100">
      <div className="grid grid-cols-[9fr_1fr]">
        <div className="overflow-x-hidden">
          <div className="flex gap-4">
            <p className="text-blue-600 text-sm w-fit px-3 py-1 bg-indigo-100 rounded">
              {shortCode}
            </p>

            <p className="text-purple-600 text-sm w-fit px-3 py-1 bg-purple-100 rounded-full">
              {`${visitedCount} visits`}
            </p>
          </div>

          <a
            href={redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 break-all"
          >
            {redirectUrl}
          </a>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex flex-col items-center justify-center text-indigo-500 hover:text-indigo-300"
          aria-label="Copy short URL"
          type="button"
        >
          <Copy />
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
