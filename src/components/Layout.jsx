import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Collapse, Typography, Box, Divider, Toolbar, IconButton, Tooltip
} from "@mui/material";
import {
  Dashboard, Layers, People, MenuBook, Person,
  ExpandMore, ExpandLess, Storage, ChevronLeft, ChevronRight
} from "@mui/icons-material";
import Navbar from "./Navbar.jsx";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isMasterPath = ["/batches", "/students", "/courses", "/instructors"].some(p =>
    location.pathname.startsWith(p)
  );
  const [masterOpen, setMasterOpen] = useState(isMasterPath);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const NavItem = ({ icon, label, path }) => (
    <Tooltip title={collapsed ? label : ""} placement="right">
      <ListItemButton selected={isActive(path)} onClick={() => navigate(path)}
        sx={{ mx: 1, borderRadius: 2, mb: 0.5, justifyContent: collapsed ? "center" : "flex-start" }}>
        <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: isActive(path) ? "primary.main" : "text.secondary", justifyContent: "center" }}>
          {icon}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText primary={label}
            primaryTypographyProps={{ fontSize: 14, fontWeight: isActive(path) ? 600 : 400 }} />
        )}
      </ListItemButton>
    </Tooltip>
  );

  return (
    <Drawer variant="permanent" sx={{
      width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
      flexShrink: 0,
      transition: "width 0.3s",
      "& .MuiDrawer-paper": {
        width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        boxSizing: "border-box",
        top: 64,
        overflowX: "hidden",
        transition: "width 0.3s"
      }
    }}>
      <Box sx={{ overflow: "auto", pt: 2, pb: 2, height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Toggle Button */}
        <Box sx={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", px: 1, mb: 1 }}>
          <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {/* Navigation */}
        {!collapsed && (
          <Typography variant="caption" sx={{ px: 2.5, color: "text.disabled",
            fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Navigation
          </Typography>
        )}

        <List dense sx={{ mt: 1 }}>
          <NavItem icon={<Dashboard fontSize="small" />} label="Dashboard" path="/dashboard" />
        </List>

        <Divider sx={{ my: 1, mx: collapsed ? 1 : 2 }} />

        {/* Manage */}
        {!collapsed && (
          <Typography variant="caption" sx={{ px: 2.5, color: "text.disabled",
            fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Manage
          </Typography>
        )}

        <List dense sx={{ mt: 1 }}>
          <Tooltip title={collapsed ? "Master" : ""} placement="right">
            <ListItemButton
              onClick={() => { if (!collapsed) setMasterOpen(!masterOpen); }}
              sx={{ mx: 1, borderRadius: 2, mb: 0.5, justifyContent: collapsed ? "center" : "flex-start" }}>
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: "text.secondary", justifyContent: "center" }}>
                <Storage fontSize="small" />
              </ListItemIcon>
              {!collapsed && (
                <>
                  <ListItemText primary="Master"
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                  {masterOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </>
              )}
            </ListItemButton>
          </Tooltip>

          {/* Submenu — hidden when collapsed */}
          {!collapsed && (
            <Collapse in={masterOpen} timeout="auto" unmountOnExit>
              <List dense disablePadding sx={{ pl: 2 }}>
                <NavItem icon={<Layers fontSize="small" />}   label="Batches"     path="/batches" />
                <NavItem icon={<People fontSize="small" />}   label="Students"    path="/students" />
                <NavItem icon={<MenuBook fontSize="small" />} label="Courses"     path="/courses" />
                <NavItem icon={<Person fontSize="small" />}   label="Instructors" path="/instructors" />
              </List>
            </Collapse>
          )}

          {/* When collapsed — show icons directly */}
          {collapsed && (
            <List dense disablePadding>
              <NavItem icon={<Layers fontSize="small" />}   label="Batches"     path="/batches" />
              <NavItem icon={<People fontSize="small" />}   label="Students"    path="/students" />
              <NavItem icon={<MenuBook fontSize="small" />} label="Courses"     path="/courses" />
              <NavItem icon={<Person fontSize="small" />}   label="Instructors" path="/instructors" />
            </List>
          )}
        </List>

      </Box>
    </Drawer>
  );
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Box component="main" sx={{
        flexGrow: 1, p: 3,
        marginLeft: 0,
        transition: "margin 0.3s"
      }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}