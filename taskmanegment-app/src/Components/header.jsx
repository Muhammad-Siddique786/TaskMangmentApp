import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          TaskApp
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">

          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>

          {user && (
            <Link to="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/signin"
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">
                
                {user.displayName || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  );
}