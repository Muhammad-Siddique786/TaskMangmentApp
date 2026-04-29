import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export default function AddTaskModal({
  isOpen,
  onClose,
  onEditTask,
  editTask,
  user,
  onAddTask,
}) {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");

  // ================= FILL DATA (EDIT MODE) =================
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDesc(editTask.desc || "");
      setDate(editTask.date || "");
      setPriority(editTask.priority || "medium");
    } else {
      setTitle("");
      setDesc("");
      setDate("");
      setPriority("medium");
    }
  }, [editTask]);

  if (!isOpen) return null;

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      desc,
      date,
      priority,
      status: editTask ? editTask.status : "pending",
      userId: user.uid,
    };

    try {

      // ================= EDIT =================
      if (editTask) {
        await updateDoc(doc(db, "tasks", editTask.id), taskData);

        if (onEditTask) {
          onEditTask({ id: editTask.id, ...taskData });
        }
      }

      // ================= ADD =================
      else {
        const docRef = await addDoc(collection(db, "tasks"), taskData);

        if (onAddTask) {
          onAddTask({ id: docRef.id, ...taskData });
        }
      }

      // ================= RESET =================
      setTitle("");
      setDesc("");
      setDate("");
      setPriority("medium");

      onClose();

    } catch (err) {
      console.log("Task error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          {editTask ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 rounded"
            required
          />

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            className="border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>

          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {editTask ? "Update Task" : "Add Task"}
          </button>

        </form>

      </div>
    </div>
  );
}