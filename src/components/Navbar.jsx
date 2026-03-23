import { useState } from "react";

function Navbar() {

  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">

      <h2>Student Management</h2>

      <div className="profile">

        <span onClick={() => setOpen(!open)}>👤</span>

        {open && (
          <div className="dropdown">
            <p>Forgot Password</p>
            <p>Logout</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Navbar;