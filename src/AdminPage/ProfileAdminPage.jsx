import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../Function/LoadingOverlay";

const ProfileAdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // dummy user
  const user = {
    name: "Admin",
    phone_number: "AdminTesting@gmail.com",
  };

  useEffect(() => {
    // simulasi loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="md:p-5">
      <LoadingOverlay show={isLoading} message="Memuat data pengguna..." />
      <div className="relative py-5 max-w-5xl mx-auto shadow rounded bg-[var(--background_component)]">
        {/* Tombol kembali */}
        <div className="px-5">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="btn-default transition"
          >
            <i className="ri-arrow-left-wide-line"></i> Kembali
          </button>
        </div>

        {/* Judul halaman */}
        <div className="pt-10 pb-5 px-5 text-left">
          <h1 className="text-title font-bold">Profil Admin</h1>
        </div>

        {/* Data Admin */}
        <div className="px-5 py-10 border-y border-[var(--background_button)]">
          <div className="flex items-center gap-6">
            <div className="text-title w-20 h-20 rounded-full flex items-center justify-center font-bold bg-[var(--background_button)]">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col items-start">
              <p className="text-subtitle font-bold">{user.name}</p>
              <p className="text-paragraph">
                Email: <strong>{user.phone_number}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdminPage;
