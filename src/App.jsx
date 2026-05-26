import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; //  for toast
import "react-toastify/dist/ReactToastify.css"; //  toast css

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import StudentDetail from "./pages/StudentDetail"; // detail page
import Batches from "./pages/Batches"; // batches page
import Instructors from "./pages/Instructors";
import "./App.css";
import CourseDetail from "./pages/CourseDetail";
// Layout
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student-detail" element={<StudentDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/course-detail" element={<CourseDetail />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast Container (IMPORTANT) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </ErrorBoundary>
  );
}

export default App;