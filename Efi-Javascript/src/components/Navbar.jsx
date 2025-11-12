import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // 🔹 navegación SPA sin recarga
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">React-EFI Javascript</span>

      {user ? (
        <div className="d-flex align-items-center">
          <Link to="/posts" className="btn btn-outline-light btn-sm me-2">
            Posts
          </Link>

          {user.role === "admin" && (
            <Link to="/reviews" className="btn btn-outline-warning btn-sm me-2">
              Reviews
            </Link>
          )}

          <span className="text-light me-3">
            {user.name} ({user.role})
          </span>

          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="btn btn-outline-light btn-sm me-2">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn btn-outline-success btn-sm">
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
}
