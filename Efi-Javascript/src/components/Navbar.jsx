import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      {/* 🔹 Nombre del proyecto */}
      <span className="navbar-brand mb-0 h1">React-EFI Javascript</span>

      {/* 🔹 Si hay usuario logueado, mostrar menú */}
      {user ? (
        <div className="d-flex align-items-center">
          {/* Enlaces visibles para todos los roles */}
          <a href="/posts" className="btn btn-outline-light btn-sm me-2">
            Posts
          </a>

          {/* Enlace visible solo para admin */}
          {user.role === "admin" && (
            <a
              href="/reviews"
              className="btn btn-outline-warning btn-sm me-2"
            >
              Reviews
            </a>
          )}

          {/* Info del usuario */}
          <span className="text-light me-3">
            {user.name} ({user.role})
          </span>

          {/* Botón de logout */}
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              logout();
              window.location.href = "/login"; // 🔹 redirigir al login después del logout
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        /* 🔹 Si no hay usuario logueado, mostrar enlaces públicos */
        <div>
          <a href="/login" className="btn btn-outline-light btn-sm me-2">
            Iniciar sesión
          </a>
          <a href="/register" className="btn btn-outline-success btn-sm">
            Registrarse
          </a>
        </div>
      )}
    </nav>
  );
}
 