import React, { useState, useEffect } from "react"; // Import useState and useEffect hooks
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RolePage from "./components/core/RolePage";
import AdminLogin from "./components/admin/AdminLogin";
import StudentLogin from "./components/student/StudentLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import ResetPasswordPage from "./components/core/ResetPassword";
import ProtectedRoute from "./components/core/ProtectedRoute";
import ProtectedRouteStudent from "./components/core/ProtectedRouteStudent";
import PublicRoute from "./components/core/PublicRoute";
import PageNotFound from "./components/core/PageNotFound";
import MusicPlayer from "./components/musicplay";

function App() {
  const forgetToken = localStorage.getItem("forgetToken") || null;
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Define the playMusic function to start playing the music
  const playMusic = () => {
    setIsMusicPlaying(true);
  };

  // Call the playMusic function when the component mounts
  useEffect(() => {
    playMusic();
  }, []);

  return (
    <main className="App">
      {/* Render the MusicPlayer component if music is playing */}
      {isMusicPlaying && <MusicPlayer />}

      <Routes>
        <Route element={<PublicRoute restricted={true} />}>
          <Route path="/" element={<RolePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRouteStudent />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>

        <Route
          path={
            localStorage.getItem("forgetRole") === "admin"
              ? `/reset-password/${forgetToken}`
              : `/reset-password-student/${forgetToken}`
          }
          element={<ResetPasswordPage />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
