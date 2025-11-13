import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container text-center d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Bienvenido A Nuestra E.F.I</h1>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary px-4"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </button>

        <button
          className="btn btn-secondary px-4"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
      </div>

      {/* 🔹 Footer con Bootstrap */}
      <footer className="text-muted small mt-5">
        E.F.I Práctica Profesionalizante I | ITEC Río Cuarto | Integrantes: Mateo Urquiza - Seba Maldonado
      </footer>
    </div>
  );
}



