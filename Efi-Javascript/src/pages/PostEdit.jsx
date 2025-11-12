import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function PostEdit() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({ titulo: "", contenido: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPost({ titulo: data.titulo, contenido: data.contenido });
      } catch {
        toast.error("Error cargando el post");
      }
    };
    fetchPost();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error();
      toast.success("✅ Post actualizado");
      navigate("/posts");
    } catch {
      toast.error("❌ Error al actualizar");
    }
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Editar post</h3>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <input
          className="form-control mb-2"
          placeholder="Título"
          value={post.titulo}
          onChange={(e) => setPost({ ...post, titulo: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Contenido"
          rows="4"
          value={post.contenido}
          onChange={(e) => setPost({ ...post, contenido: e.target.value })}
        ></textarea>
        <button className="btn btn-primary w-100">Guardar cambios</button>
      </form>
    </div>
  );
}

