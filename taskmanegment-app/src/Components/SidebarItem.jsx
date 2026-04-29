export default function SidebarItem({ icon, label, active, onClick, collapsed }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      <span className="text-lg">{icon}</span>

      {!collapsed && (
        <span className="text-sm">{label}</span>
      )}
    </div>
  );
}