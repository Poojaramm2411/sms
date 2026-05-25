import { Link, useLocation } from "react-router-dom";
import { 
  FaUserGraduate, 
  FaBook, 
  FaLayerGroup, 
  FaChalkboardTeacher,
  FaTachometerAlt  // ✅ dashboard icon
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/dashboard", icon: <FaTachometerAlt className="icon" />, label: "Dashboard" },
    { to: "/students", icon: <FaUserGraduate className="icon" />, label: "Students" },
    { to: "/courses", icon: <FaBook className="icon" />, label: "Courses" },
    { to: "/batches", icon: <FaLayerGroup className="icon" />, label: "Batches" },
    { to: "/instructors", icon: <FaChalkboardTeacher className="icon" />, label: "Instructors" },
  ];

  return (
    <div className="sidebar">
      <h2>Admin</h2>
      {links.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={location.pathname === to ? "active-link" : ""}
        >
          {icon} {label}
        </Link>
      ))}
    </div>
  );
}