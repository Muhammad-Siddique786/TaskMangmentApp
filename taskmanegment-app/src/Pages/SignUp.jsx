import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCred.user, {
        displayName: `${firstName} ${lastName}`,
      });

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6  rounded-xl shadow-md w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Signup
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-3">

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}