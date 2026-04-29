import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function TaskBarChart({ data }) {
  return (
    <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow">
      <h2 className="text-sm font-semibold mb-4 text-gray-700 dark:text-white">
        Task Overview
      </h2>

      <BarChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </div>
  );
}