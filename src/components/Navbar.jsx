import { useState, useRef, useEffect } from "react";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import "../styles/Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { handleLogout, admin } = useAuth();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = admin?.name ? admin.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "AD";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">S</div>
        <span className="navbar-name">Student<span>MS</span></span>
      </div>

      <div className="navbar-right">
        <div className="navbar-profile" ref={ref}>
          <div className="profile-trigger" onClick={() => setOpen(!open)}>
            <div className="profile-avatar">{initials}</div>
            <span className="profile-name">{admin?.name || "Admin"}</span>
            <FiChevronDown style={{ fontSize: 13, color: "var(--text-muted)" }} />
          </div>

          {open && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <FiUser /> Profile
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item danger" onClick={handleLogout}>
                <FiLogOut /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}








