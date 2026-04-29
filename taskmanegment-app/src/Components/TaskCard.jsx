import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TaskCard({ task, onEdit }) {

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  const updateStatus = async (status) => {
    await updateDoc(doc(db, "tasks", task.id), { status });
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm">

      <h3 className="font-semibold">{task.title}</h3>

      <span className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>

      <p className="text-sm text-gray-500 mt-1">{task.desc}</p>

      <p className="text-xs text-gray-400 mt-2">📅 {task.date}</p>

      <div className="flex gap-2 mt-3 flex-wrap">

        <button
          onClick={() => updateStatus("pending")}
          className="text-xs bg-yellow-100 px-2 py-1 rounded"
        >
          Todo
        </button>

        <button
          onClick={() => updateStatus("doing")}
          className="text-xs bg-blue-100 px-2 py-1 rounded"
        >
          Doing
        </button>

        <button
          onClick={() => updateStatus("completed")}
          className="text-xs bg-green-100 px-2 py-1 rounded"
        >
          Done
        </button>

        {/* ✅ EDIT BUTTON FIX */}
        <button
          onClick={() => onEdit(task)}
          className="text-xs bg-purple-100 px-2 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="text-xs bg-red-100 px-2 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}