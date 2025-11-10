import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Usuario registrado correctamente");
    else alert("Error al registrar usuario");
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control mb-2" placeholder="Nombre" onChange={handleChange} required />
        <input name="email" className="form-control mb-2" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" className="form-control mb-2" placeholder="Contraseña" type="password" onChange={handleChange} required />
        <select name="role" className="form-select mb-3" onChange={handleChange}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button className="btn btn-success w-100">Registrarse</button>
      </form>
    </div>
  );
}
