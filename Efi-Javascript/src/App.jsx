import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostsList from "./pages/PostsList";     // si están en src/pages
import ReviewsList from "./pages/ReviewsList";
import { PrivateRoute } from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/registrarse" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/posts"
          element={
            <PrivateRoute roles={["admin", "user"]}>
              <PostsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute roles={["admin", "user"]}>
              <ReviewsList />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
