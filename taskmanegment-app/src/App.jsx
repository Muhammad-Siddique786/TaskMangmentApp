import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Header from "./Components/header";
import Footer from "./Components/footer";

import Home from "./Pages/Home";
import SignIn from "./Auth/SignIn";
import Signup from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";

import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        {/* FULL PAGE WRAPPER */}
        <div className="flex flex-col ">

          {/* HEADER */}
          <Header />

          {/* MAIN CONTENT */}
          <main className="flex-1 bg-gray-100 flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* FOOTER */}
          <Footer />

        </div>

      </AuthProvider>
    </BrowserRouter>
  );
}
// export default function App() {
//   return (
//     <div className="flex flex-col min-h-screen bg-red-100">

//       <div className="bg-blue-500 text-white p-4">
//         HEADER
//       </div>

//       <div className="flex-1 bg-green-200 flex items-center justify-center">
//         <SignUp />
//       </div>

//       <div className="bg-yellow-500 p-4">
//         FOOTER
//       </div>

//     </div>
//   );
// }