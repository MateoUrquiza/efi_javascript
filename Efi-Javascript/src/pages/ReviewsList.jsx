import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ReviewsList() {
  const { token, user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Cargar todas las reviews (solo admin/moderator)
  useEffect(() => {
    if (!token) {
      toast.warning("Iniciá sesión para ver las reseñas");
      return;
    }

    const fetchReviews = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/reviews", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener reseñas");

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        toast.error("Error cargando reseñas");
      }
    };

    fetchReviews();
  }, [token]);

  // 🔹 Eliminar reseña
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés eliminar esta reseña?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
        toast.success("Reseña eliminada");
      } else {
        toast.error("No se pudo eliminar la reseña");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al conectar con el servidor");
    }
  };

  // 🔹 Activar modo edición
  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditText(review.texto);
  };

  // 🔹 Guardar edición
  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/comments/${id}/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: editText }),
      });

      if (res.ok) {
        const updated = reviews.map((r) =>
          r.id === id ? { ...r, texto: editText } : r
        );
        setReviews(updated);
        setEditingId(null);
        toast.success("Reseña actualizada");
      } else {
        toast.error("No se pudo actualizar la reseña");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar la edición");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💬 Reseñas</h2>

      {reviews.length === 0 ? (
        <p>No hay reseñas disponibles.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="w-100">
                {/* Modo edición */}
                {editingId === r.id ? (
                  <>
                    <textarea
                      className="form-control mb-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSave(r.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <p>{r.texto}</p>
                    <small className="text-muted">
                      🧑 Usuario ID: {r.usuario_id} — 📄 Post #{r.post_id} —{" "}
                      {new Date(r.fecha_creacion).toLocaleString()}
                    </small>
                    <div className="mt-2">
                      {/* Botones según rol */}
                      {(user?.role === "admin" ||
                        user?.role === "moderator" ||
                        user?.user_id === r.usuario_id) && (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(r)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(r.id)}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
