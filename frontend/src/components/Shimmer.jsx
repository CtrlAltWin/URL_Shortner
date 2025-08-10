export default function Shimmer() {
  return (
    <div className="animate-pulse p-6 max-w-6xl mx-auto space-y-8 bg-gray-50 rounded-md">
      {/* Header */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
        <div className="h-8 w-48 rounded-md bg-gray-200"></div>
        <div className="h-4 w-64 rounded-md bg-gray-200"></div>
      </div>

      {/* Stats cards */}
      <div className="flex justify-between space-x-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex-1"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-6 w-12 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>

      {/* URL list */}
      <div className="rounded-lg border border-gray-200 p-4 space-y-4">
        <div className="h-6 w-48 rounded-md bg-gray-200 mb-3"></div>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-md p-4 flex justify-between items-center"
          >
            <div className="space-y-1 max-w-[70%]">
              <div className="flex space-x-2 mb-1">
                <div className="h-5 w-16 rounded bg-gray-200"></div>
                <div className="h-5 w-14 rounded bg-gray-200"></div>
              </div>
              <div className="h-4 w-full rounded bg-gray-200"></div>
            </div>
            <div className="w-8 h-8 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
