import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";

// 🧩 Validación con Yup
const validationSchema = Yup.object({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function RegisterForm() {
  const navigate = useNavigate();

  // 🧩 Envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("✅ Usuario registrado con éxito");
        resetForm();
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.status === 409) {
        toast.error("⚠️ El usuario o email ya existe");
      } else if (response.status === 422) {
        toast.error("❌ Datos inválidos, revisá los campos");
      } else {
        toast.error("❌ Error al registrar el usuario");
      }
    } catch (error) {
      toast.error("💥 Error de conexión con el servidor");
      console.error(error);
    }
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{ maxWidth: "500px", backgroundColor: "white" }}
    >
      <h2 className="text-center mb-4">Registro</h2>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          role: "user",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Nombre de usuario */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <Field
                id="username"
                name="username"
                className="form-control"
                placeholder="Tu nombre de usuario"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="nombre@correo.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Rol */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Rol
              </label>
              <Field as="select" id="role" name="role" className="form-select">
                <option value="user">Usuario</option>
                <option value="moderator">Moderador</option>
                <option value="admin">Administrador</option>
              </Field>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
