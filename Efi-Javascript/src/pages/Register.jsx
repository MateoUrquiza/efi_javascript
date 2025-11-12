import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) alert("✅ Usuario registrado correctamente");
    else alert("❌ Error al registrar usuario");
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          className="form-control mb-2"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          type="password"
          onChange={handleChange}
          required
        />
        <select name="role" className="form-select mb-3" onChange={handleChange}>
          <option value="user">Usuario</option>
          <option value="moderator">Moderador</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="btn btn-success w-100">Registrarse</button>
      </form>
    </div>
  );
}
