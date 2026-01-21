import AdminLayout from "./components/layouts/AdminLayout";
import HomePage from "./pages/home/HomePage";
import BlogCreatePage from "./pages/blog/BlogCreatePage";
import BlogViewPage from "./pages/blog/BlogViewPage";
import BlogEditPage from "./pages/blog/BlogEditPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/login/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route
            index
            element={
              <AdminLayout>
                <HomePage />
              </AdminLayout>
            }
          ></Route>
          <Route
            path="/blogs/create"
            element={
              <AdminLayout>
                <BlogCreatePage />
              </AdminLayout>
            }
          ></Route>
          <Route
            path="/blogs/view/:blogSlug"
            element={
              <AdminLayout>
                <BlogViewPage />
              </AdminLayout>
            }
          ></Route>
          <Route
            path="/blogs/edit/:blogSlug"
            element={
              <AdminLayout>
                <BlogEditPage />
              </AdminLayout>
            }
          ></Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </>
  );
}

export default App;
