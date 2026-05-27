import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css"; 
function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h2>SMS</h2>
      <div className="profile" ref={dropdownRef}>
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