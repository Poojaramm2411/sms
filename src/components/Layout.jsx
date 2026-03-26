import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout-container">

      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="page-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Layout;