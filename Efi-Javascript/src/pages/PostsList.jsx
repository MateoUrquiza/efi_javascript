import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/")
      .then((res) => setPosts(res.data))
      .catch(() => toast.error("Error cargando posts"));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Publicaciones</h2>
      <ul className="list-group">
        {posts.map((p) => (
          <li key={p.id} className="list-group-item">
            <strong>{p.title}</strong> — {p.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
