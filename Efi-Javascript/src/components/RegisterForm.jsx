import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";

// 🧩 Validación con Yup
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

export default function RegisterForm() {
  const navigate = useNavigate();

  // 🧩 Envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Usuario registrado con éxito");
        resetForm();
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Hubo un error al registrar el usuario");
      }
    } catch (error) {
      toast.error("Hubo un error con el servidor");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Crear cuenta</h2>

      <Formik
        initialValues={{ name: "", email: "", password: "", role: "usuario" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Nombre */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <Field
                id="name"
                name="name"
                className="form-control"
                placeholder="Tu nombre"
              />
              <ErrorMessage name="name" component="div" className="text-danger small" />
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
              <ErrorMessage name="email" component="div" className="text-danger small" />
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
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            {/* Rol (opcional) */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Rol
              </label>
              <Field as="select" id="role" name="role" className="form-select">
                <option value="usuario">Usuario</option>
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
