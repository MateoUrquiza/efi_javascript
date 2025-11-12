import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import Login from "./pages/Login";
import PostsList from "./pages/PostsList";
import PostEdit from "./pages/PostEdit";
import PostDetail from "./pages/PostDetail";
import { PrivateRoute } from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";
import ReviewsList from "./pages/ReviewsList";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Rutas protegidas */}
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              <PostDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:id/edit"
          element={
            <PrivateRoute>
              <PostEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <ReviewsList />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
}

