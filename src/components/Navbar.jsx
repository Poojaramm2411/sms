import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // redirect to login
  };

  return (
    <div className="navbar">
      <h2>Student Management</h2>

      <div className="profile" ref={dropdownRef}>
        {/* ✅ Professional Profile Icon */}
        <FaUserCircle
          className="profile-icon"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="dropdown">
            <p>Forgot Password</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;