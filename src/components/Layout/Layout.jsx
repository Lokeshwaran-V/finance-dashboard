import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">Finance</h2>

        <nav className="navigation">
          <NavLink to="/" className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/transactions" className="nav-link">
            Transactions
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;