import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PostsList() {
  const { token, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [nuevoPost, setNuevoPost] = useState({ titulo: "", contenido: "" });
  const navigate = useNavigate();

  // 🔹 Listar posts
  useEffect(() => {
    if (!token) {
      toast.warning("Iniciá sesión para ver los posts");
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        toast.error("Error cargando posts");
        console.error(err);
      }
    };

    fetchPosts();
  }, [token]);

  // 🔹 Crear post
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nuevoPost.titulo.trim() || !nuevoPost.contenido.trim()) {
      toast.error("Completá todos los campos");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPost),
      });

      if (!res.ok) throw new Error("Error al crear el post");

      const data = await res.json();
      setPosts([data, ...posts]);
      setNuevoPost({ titulo: "", contenido: "" });
      toast.success("✅ Post creado correctamente");
    } catch (err) {
      toast.error("❌ No se pudo crear el post");
    }
  };

  // 🔹 Eliminar post
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este post?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar post");

      setPosts(posts.filter((p) => p.id !== id));
      toast.info("🗑️ Post eliminado");
    } catch (err) {
      toast.error("❌ No se pudo eliminar el post");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📢 Publicaciones</h2>

      {/* Crear */}
      {token && (
        <form onSubmit={handleCreate} className="mb-4 p-3 border rounded bg-light">
          <h5>📝 Crear nuevo post</h5>
          <input
            className="form-control mb-2"
            placeholder="Título"
            value={nuevoPost.titulo}
            onChange={(e) => setNuevoPost({ ...nuevoPost, titulo: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Contenido"
            rows="3"
            value={nuevoPost.contenido}
            onChange={(e) => setNuevoPost({ ...nuevoPost, contenido: e.target.value })}
          ></textarea>
          <button className="btn btn-success w-100">Publicar</button>
        </form>
      )}

      {/* Listado */}
      {posts.length === 0 ? (
        <p>No hay publicaciones disponibles.</p>
      ) : (
        <ul className="list-group">
          {posts.map((p) => (
            <li key={p.id} className="list-group-item">
              <h5>{p.titulo}</h5>
              <p>{p.contenido}</p>
              <small className="text-muted">
                Autor ID: {p.usuario_id} —{" "}
                {new Date(p.fecha_creacion).toLocaleString()}
              </small>

              <div className="mt-2">
                <button
                  className="btn btn-outline-info btn-sm me-2"
                  onClick={() => navigate(`/posts/${p.id}`)}
                >
                  👁️ Ver
                </button>

                {(user?.role === "admin" || user?.user_id === p.usuario_id) && (
                  <>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => navigate(`/posts/${p.id}/edit`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Eliminar
                    </button>
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

