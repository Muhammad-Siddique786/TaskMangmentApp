import { useState, useEffect } from "react";
import KanbanColumn from "../Components/KanbanColumn";
import SidebarItem from "../Components/SidebarItem";
import AddTaskModal from "../Components/AddTaskModal";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import TaskPieChart from "../Components/TaskPieChart";
import TaskBarChart from "../Components/TaskBarChart";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user } = useAuth();

  // ================= FIRESTORE =================
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setTasks(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [user]);

  // ================= FILTER + SEARCH =================
  const filteredTasks = tasks
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) => {
      const key = search.toLowerCase();
      return (
        t.title?.toLowerCase().includes(key) ||
        t.desc?.toLowerCase().includes(key)
      );
    });

  const todoTasks = filteredTasks.filter((t) => t.status === "pending");
  const doingTasks = filteredTasks.filter((t) => t.status === "doing");
  const doneTasks = filteredTasks.filter((t) => t.status === "completed");

  // ================= STATS =================
  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const doing = tasks.filter(t => t.status === "doing").length;

  const progress = totalTasks ? Math.round((completed / totalTasks) * 100) : 0;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Doing", value: doing },
    { name: "Completed", value: completed },
  ];

  const handleEditClick = (task) => {
    setEditTask(task);
    setOpenModal(true);
  };

  return (
    <div className={`${darkMode ? "bg-[#0f172a]" : "bg-[#f7f7f5]"} min-h-screen flex w-full overflow-x-hidden`}>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:relative z-50 h-full md:h-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-64 bg-white dark:bg-[#1e293b]
          border-r transition-transform duration-300 flex flex-col
        `}
      >

        <div className="p-5 border-b">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Task Notes
          </h1>
        </div>

        <nav className="p-2 space-y-2">

          <SidebarItem icon="📄" label="All"
            active={filter === "all"} onClick={() => setFilter("all")} />

          <SidebarItem icon="🟡" label="Todo"
            active={filter === "pending"} onClick={() => setFilter("pending")} />

          <SidebarItem icon="🔵" label="Doing"
            active={filter === "doing"} onClick={() => setFilter("doing")} />

          <SidebarItem icon="🟢" label="Done"
            active={filter === "completed"} onClick={() => setFilter("completed")} />

        </nav>
      </aside>

      {/* BACKDROP (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col w-full">

        {/* HEADER */}
        <header className="bg-white dark:bg-[#1e293b] border-b px-4 md:px-6 py-3 flex justify-between items-center flex-wrap gap-2">

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
            >
              ☰
            </button>

            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm"
            />

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => {
                setEditTask(null);
                setOpenModal(true);
              }}
              className="bg-black text-white px-4 py-2 rounded text-sm"
            >
              + New
            </button>

          </div>

        </header>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6 py-4">

          <div className="bg-white dark:bg-[#1e293b] p-4 rounded-xl shadow">
            Total: {totalTasks}
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">
            Pending: {pending}
          </div>

          <div className="bg-blue-100 p-4 rounded-xl">
            Doing: {doing}
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            Done: {completed}
          </div>

        </div>

        {/* PROGRESS */}
        <div className="px-4 md:px-6">
          <div className="bg-gray-200 h-3 rounded-full">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{progress}% Completed</p>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 mt-4">
          <TaskPieChart data={chartData} />
          <TaskBarChart data={chartData} />
        </div>

        {/* ================= KANBAN ================= */}
        <main className="p-4 md:p-6 flex-1 w-full">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {(filter === "all" || filter === "pending") && (
              <KanbanColumn title="Todo" tasks={todoTasks} onEdit={handleEditClick} />
            )}

            {(filter === "all" || filter === "doing") && (
              <KanbanColumn title="Doing" tasks={doingTasks} onEdit={handleEditClick} />
            )}

            {(filter === "all" || filter === "completed") && (
              <KanbanColumn title="Done" tasks={doneTasks} onEdit={handleEditClick} />
            )}

          </div>

        </main>

        {/* MODAL */}
        {openModal && (
          <AddTaskModal
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setEditTask(null);
            }}
            editTask={editTask}
            user={user}
          />
        )}

      </div>
    </div>
  );
}