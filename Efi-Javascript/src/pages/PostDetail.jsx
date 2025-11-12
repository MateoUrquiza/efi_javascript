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
        body: JSON.stringify({ contenido: newReview }),
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
            <li key={r.id} className="list-group-item">
              {r.contenido}
              <br />
              <small className="text-muted">Usuario {r.usuario_id}</small>
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

