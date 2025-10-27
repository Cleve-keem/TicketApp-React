import { Link, useNavigate } from "react-router-dom";
import { getSession, logout } from "../services/authService";

export default function NavBar() {
  const nav = useNavigate();
  const session = getSession();

  function handleLogout() {
    logout();
    nav("/", { replace: true });
  }

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <Link className="brand" to="/">
          <div className="logo" aria-hidden="true">
            TA
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>TicketApp</div>
          </div>
        </Link>

        <div className="nav-actions" role="navigation" aria-label="main">
          <Link to="/" className="helper">
            Home
          </Link>
          <Link to="/dashboard" className="helper">
            Dashboard
          </Link>
          <Link to="/tickets" className="helper">
            Tickets
          </Link>
          {!session ? (
            <div className="auth-actions">
              <Link to="/auth/login" className="btn ghost">
                Login
              </Link>
              <Link to="/auth/signup" className="btn primary">
                Get Started
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="btn ghost"
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
