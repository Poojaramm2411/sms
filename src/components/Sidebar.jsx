import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/students">Students</Link>
      <Link to="/courses">Courses</Link>

    </div>
  );
}

export default Sidebar;