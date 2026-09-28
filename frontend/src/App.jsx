import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;