import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToHash from "./Function/ScrollToHash";
import ScrollToTop from "./Function/ScrollToTop";

// global
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import ForgotPasswordPage from "./Components/ForgotPasswordPage";

// AdminPage
import AdminRoute from "./Function/AdminRoute";
import AdminLayout from "./Layout/AdminLayout";

import BookEditor from "./AdminPage/BookEditorPage/BookEditor";
import BookDetailAdmin from "./AdminPage/BookEditorPage/BookDetailAdmin";
import BookEdit from "./AdminPage/BookEditorPage/BookEdit";

import ProfileAdminPage from "./AdminPage/ProfileAdminPage";
import TutorialAdminPage from "./AdminPage/TutorialAdminPage";
import AuthorEditor from "./AdminPage/AuthorEditor/AuthorEditor";
import SubjectEditor from "./AdminPage/SubjectEditor/SubjectEditor";
import BorrowRequests from "./AdminPage/BorrowEditor/BorrowRequests";
import BorrowHistory from "./AdminPage/BorrowHistoryEditor/BorrowHistory";
import VisitorChart from "./AdminPage/e-LibraryVisitorChart/VisitorChart";

// UserPage
import UserLayout from "./Layout/UserLayout";
import BookPage from "./UserPage/Book/BookPage";
import BookDetail from "./UserPage/Page/BookDetail";
import BookReader from "./UserPage/Page/BookReader";
import Information from "./UserPage/Page/Information";
import BorrowBookPage from "./UserPage/Page/BorrowBookPage";
import ProfileUserPage from "./UserPage/Page/ProfileUserPage";
import TutorialUserPage from "./UserPage/Page/TutorialUserPage";
import DashboardUser from "./UserPage/Dashboard/DashboardUser";

function App() {
  const [_auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );

  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <Routes>
        {/* route global */}
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* route admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="profil" element={<ProfileAdminPage />} />
          <Route path="tutorial" element={<TutorialAdminPage />} />
          <Route path="dashboard" element={<VisitorChart />} />

          <Route path="buku" element={<BookEditor />} />
          <Route path="buku/:slug/detail" element={<BookDetailAdmin />} />
          <Route path="buku/:slug/edit" element={<BookEdit />} />

          <Route path="subjek" element={<SubjectEditor />} />
          <Route path="penulis" element={<AuthorEditor />} />
          <Route
            path="/admin/pengajuan/peminjaman/buku"
            element={<BorrowRequests />}
          />
          <Route
            path="/admin/riwayat/peminjaman/buku"
            element={<BorrowHistory />}
          />
        </Route>

        {/* route user */}
        <Route element={<UserLayout />}>
          <Route path="profil" element={<ProfileUserPage />} />
          <Route path="tutorial" element={<TutorialUserPage />} />
          <Route path="informasi" element={<Information />} />
          <Route index element={<DashboardUser />} />
          <Route path="daftar-buku/" element={<BookPage />} />
          <Route path="daftar-buku/:classification" element={<BookPage />} />
          <Route path="buku/:slug/detail" element={<BookDetail />} /> 
          <Route path="baca/online/:bookSlug" element={<BookReader />} />
          <Route path="pinjam/:bookSlug" element={<BorrowBookPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
