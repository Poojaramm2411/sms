import { Link } from "react-router-dom";
import { FaUserGraduate, FaBook, FaLayerGroup, FaChalkboardTeacher } from "react-icons/fa";
// import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin</h2>

      <Link to="/students">
        <FaUserGraduate className="icon" /> Students
      </Link>

      <Link to="/courses">
        <FaBook className="icon" /> Courses
      </Link>

      <Link to="/batches">
        <FaLayerGroup className="icon" /> Batches
      </Link>
      <Link to="/instructors">
      <FaChalkboardTeacher className="icon" /> Instructors
      </Link>
        
    </div>
  );
}