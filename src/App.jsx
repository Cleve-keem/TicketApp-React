import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import ProtectedRoute from "./components/ProtectedRoute";
import Toasts from "./components/Toasts";
import NavBar from "./components/NavBar";

console.log("hello");

export default function App() {
  return (
    <div className="app-root">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toasts />
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} TicketApp</p>
          <nav aria-label="footer">
            <a href="/">Home</a>
            <a href="/auth/login">Login</a>
            <a href="/auth/signup">Signup</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
