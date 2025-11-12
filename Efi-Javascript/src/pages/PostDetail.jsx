import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function PostDetail() {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  // 🔹 Cargar post + comentarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPost = await fetch(`http://127.0.0.1:5000/api/posts/${id}`);
        const postData = await resPost.json();
        setPost(postData);

        const resReviews = await fetch(`http://127.0.0.1:5000/api/posts/${id}/comments`);
        const reviewData = await resReviews.json();
        setReviews(reviewData);
      } catch {
        toast.error("Error cargando post o comentarios");
      }
    };
    fetchData();
  }, [id]);

  // 🔹 Crear comentario
  const handleReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: newReview }), // ✅ Campo correcto
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setReviews([...reviews, data]);
      setNewReview("");
      toast.success("💬 Comentario agregado");
    } catch {
      toast.error("❌ Error al comentar");
    }
  };

  // 🔹 Eliminar comentario (autor o admin/moderator)
  const handleDelete = async (commentId) => {
    if (!confirm("¿Seguro que querés eliminar este comentario?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();
      setReviews(reviews.filter((r) => r.id !== commentId));
      toast.success("🗑 Comentario eliminado");
    } catch {
      toast.error("❌ No se pudo eliminar el comentario");
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>{post.titulo}</h2>
      <p>{post.contenido}</p>
      <hr />
      <h5>💬 Comentarios</h5>

      {reviews.length === 0 ? (
        <p>No hay comentarios todavía.</p>
      ) : (
        <ul className="list-group mb-3">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                {r.texto}
                <br />
                <small className="text-muted">
                  Usuario {r.usuario_id}
                </small>
              </div>

              {/* 🔹 Solo autor o admin/moderator pueden eliminar */}
              {((parseInt(user?.sub) === r.usuario_id) ||
                user?.role === "admin" ||
                user?.role === "moderator") && (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(r.id)}
                >
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {token && (
        <form onSubmit={handleReview}>
          <textarea
            className="form-control mb-2"
            placeholder="Escribí tu comentario..."
            rows="3"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <button className="btn btn-primary w-100">Comentar</button>
        </form>
      )}
    </div>
  );
}
