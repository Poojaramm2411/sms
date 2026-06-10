import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiBook, FiLayers, FiUserCheck, FiArrowRight } from "react-icons/fi";
import { fetchBatches } from "../store/slices/batchSlice";
import { fetchStudents } from "../store/slices/studentSlice";
import { fetchCourses } from "../store/slices/courseSlice";
import { fetchInstructors } from "../store/slices/instructorSlice";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { totalElements: studentCount }    = useSelector((s) => s.students);
  const { totalElements: courseCount }     = useSelector((s) => s.courses);
  const { totalElements: batchCount }      = useSelector((s) => s.batches);
  const { totalElements: instructorCount } = useSelector((s) => s.instructors);

  useEffect(() => {
    dispatch(fetchStudents({ page: 0, size: 1 }));
    dispatch(fetchCourses({ page: 0, size: 1 }));
    dispatch(fetchBatches({ page: 0, size: 1 }));
    dispatch(fetchInstructors({ page: 0, size: 1 }));
  }, [dispatch]);

  const stats = [
    { label: "Students",    value: studentCount,    icon: <FiUsers />,     color: "blue",  path: "/students" },
    { label: "Courses",     value: courseCount,     icon: <FiBook />,      color: "green", path: "/courses" },
    { label: "Batches",     value: batchCount,      icon: <FiLayers />,    color: "amber", path: "/batches" },
    { label: "Instructors", value: instructorCount, icon: <FiUserCheck />, color: "rose",  path: "/instructors" },
  ];

  return (
    <div className="dashboard fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your student management system</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`stat-card ${s.color}`}
            onClick={() => navigate(s.path)}
            style={{ cursor: "pointer" }}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
            <FiArrowRight style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 16 }} />
          </div>
        ))}
      </div>
    </div>
  );
}