import { useEffect, useState } from "react";
import api from "../services/api"; // ajustar ruta según ubicación del archivo
import { toast } from "react-toastify";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);

  // 🔹 Cargar todas las reviews al montar el componente
  useEffect(() => {
    api
      .get("/reviews/")
      .then((res) => setReviews(res.data))
      .catch(() => toast.error("Error al cargar las reseñas"));
  }, []);

  // 🔹 Eliminar una review
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés eliminar esta reseña?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r.id !== id));
      toast.success("Reseña eliminada");
    } catch (error) {
      toast.error("No se pudo eliminar la reseña");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Reseñas</h2>

      {reviews.length === 0 ? (
        <p>No hay reseñas disponibles.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((r) => (
            <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{r.author}</strong> — {r.content}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
