import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingOverlay from "../../Function/LoadingOverlay";
import ThemeToggle from "../../Function/ThemeToggle";

const HeaderAdmin = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // === Ambil data auth dari localStorage ===
  const savedAuth = localStorage.getItem("auth");
  const user = savedAuth ? JSON.parse(savedAuth) : null;

  // ambil theme awal dari localStorage → kalau tidak ada cek OS
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [logo, setLogo] = useState("/logo_light.png");

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Dummy user & logo
  const logoLight = "Img/logo_light.png";
  const logoDark = "Img/logo_dark.png";

  // Helper: update logo dan <html data-theme>
  // Helper: update logo dan <html data-theme>
  const applyTheme = (currentTheme) => {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "light") {
      setLogo(logoLight);
    } else {
      setLogo(logoDark);
    }
  };

  // Sinkronkan perubahan theme
  // Sinkronkan perubahan theme
  useEffect(() => {
    applyTheme(theme); // langsung apply sesuai pilihan
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Fungsi logout
  const logoutHandler = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      localStorage.removeItem("auth");
      toast.success("Berhasil logout.");
      navigate("/");
    } catch {
      toast.error("Gagal logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full p-5 flex justify-between items-center z-40 bg-[var(--background_header)]">
        <LoadingOverlay show={isLoggingOut} message="Sedang logout..." />

        {/* left (hamburger & img) */}
        <div className="flex gap-4 md:gap-8 items-center transition">
          <div className="flex items-center lg:hidden">
            {/* hamburger menu */}
            <button onClick={toggleSidebar} className="text-header">
              <i className="ri-menu-line" />
            </button>
          </div>

          {/* Logo */}
          <div className="w-60">
            <img src={logo} alt="Logo" className="object-contain" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div
          className="hidden md:flex gap-4 items-center justify-end relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => navigate("/admin/tutorial")}
            className="text-button"
          >
            Tutorial
          </button>

          <ThemeToggle theme={theme} setTheme={setTheme} />

          {user ? (
            <>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="btn-profile"
              >
                {user.username.charAt(0).toUpperCase()}
              </button>

              {showDropdown && (
                <div
                  className="absolute right-0 top-12 w-40 rounded shadow-md overflow-hidden"
                  style={{
                    backgroundColor: "var(--background_button)",
                    color: "var(--color_text_button)",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/admin/profil");
                    }}
                    className="btn-default block w-full text-left"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowConfirmLogout(true);
                    }}
                    className="btn-default block w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => navigate("/login")} className="btn-default">
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="relative md:hidden" ref={mobileDropdownRef}>
          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            className="btn-profile"
          >
            {user ? (
              user.username.charAt(0).toUpperCase()
            ) : (
              <i className="ri-menu-line text-xl"></i>
            )}
          </button>

          {showMobileMenu && (
            <div
              className="flex flex-col absolute top-14 right-0 w-64 rounded shadow-md p-4 gap-5 z-50"
              style={{
                backgroundColor: "var(--background_component)",
                color: "var(--color_text_title)",
              }}
            >
              {user ? (
                <>
                  <button
                    onClick={() => navigate("/admin/profil")}
                    className="btn-default text-left"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => navigate("/admin/tutorial")}
                    className="btn-default text-left"
                  >
                    Tutorial Admin
                  </button>
                  <ThemeToggle theme={theme} setTheme={setTheme} />
                  <button
                    onClick={() => setShowConfirmLogout(true)}
                    className="btn-default text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn-default text-left"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Modal konfirmasi logout */}
      {showConfirmLogout && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: "var(--background_overlay)" }}
        >
          <div
            className="p-6 rounded shadow-md w-full max-w-lg"
            style={{ backgroundColor: "var(--background_component)" }}
          >
            <p className="text-subtitle mb-4 text-center">
              Apa anda yakin ingin logout?
            </p>
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => {
                  setShowConfirmLogout(false);
                  logoutHandler();
                }}
                className="btn-cancel"
              >
                Ya, Logout
              </button>
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="btn-default"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderAdmin;
