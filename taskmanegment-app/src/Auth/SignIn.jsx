import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      {/* <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"> */}
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login 🔐
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            // className="border p-2 rounded width-full"
            // className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            className="w-full border px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              // className="border p-2 rounded w-full"
              // className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              className="w-full border px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm cursor-pointer text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}