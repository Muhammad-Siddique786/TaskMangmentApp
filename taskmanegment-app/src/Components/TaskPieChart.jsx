import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function TaskPieChart({ data }) {
  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow">
      <h2 className="text-sm font-semibold mb-4 text-gray-700 dark:text-white">
        Task Distribution
      </h2>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}