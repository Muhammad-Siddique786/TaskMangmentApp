import TaskCard from "./TaskCard";

export default function KanbanColumn({ title, tasks, onEdit }) {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-xl p-4 shadow-sm">

      <h2 className="text-sm font-semibold mb-4 text-gray-600 dark:text-gray-200">
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}   // ✅ FIX
            />
          ))
        )}
      </div>

    </div>
  );
}