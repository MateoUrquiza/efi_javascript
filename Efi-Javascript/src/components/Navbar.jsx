import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom"; 

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
      {/* 🔹 Logo / título clickeable */}
      <Link to="/" className="navbar-brand text-light text-decoration-none">
        React-EFI Javascript
      </Link>

      {/* 🔹 Menú derecho */}
      {user ? (
        <div className="d-flex align-items-center">
          <Link to="/posts" className="btn btn-outline-light btn-sm me-2">
            Posts
          </Link>

          {(user.role === "admin" || user.role === "moderator") && (
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



