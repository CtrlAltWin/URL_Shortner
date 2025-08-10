import { BarChart3 } from "lucide-react";

export default function StatCard({ title, value }) {
  return (
    <div className="flex items-center space-x-4 p-6 rounded-lg shadow shadow-indigo-500">
      <div className="p-2 border text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
        <BarChart3 size={35} />
      </div>
      <div className="text-gray-700">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-2xl font-bold">{value ?? 0}</p>
      </div>
    </div>
  );
}
