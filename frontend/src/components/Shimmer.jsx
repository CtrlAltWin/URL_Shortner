export default function Shimmer() {
  return (
    <div className="animate-pulse p-6 max-w-6xl mx-auto space-y-8 bg-gray-50 rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-4 mt-5">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="h-28 border border-gray-200 p-4 space-y-4 rounded-lg"
          >
            <div className="h-7 w-24 bg-gray-200"></div>
            <div className="h-7 w-12 bg-gray-200"></div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
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
