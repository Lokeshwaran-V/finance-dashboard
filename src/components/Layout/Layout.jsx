import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const navigationItems = [
  { path: "/", label: "Dashboard" },
  { path: "/transactions", label: "Transactions" },
  { path: "/planning", label: "Plannings" },
];

function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">Finance</h2>

        <nav className="navigation">
          {navigationItems.map(({ path, label }) => (
            <NavLink key={path} to={path} className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
