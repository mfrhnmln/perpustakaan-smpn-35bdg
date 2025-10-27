import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingOverlay from "../../Function/LoadingOverlay";
import ThemeToggle from "../../Function/ThemeToggle";

const Header = () => {
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
  const logoLight = "Img/logo_sekolah_light.png";
  const logoDark = "Img/logo_sekolah_dark.png";

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

  // Helper: ambil inisial user
  const getUserInitial = (u) => {
    if (u?.username && u.username.length > 0) {
      return u.username.charAt(0).toUpperCase();
    }
    return "?";
  };

  return (
    <>
      {/* header */}
      <header className="sticky top-0 w-full p-5 flex justify-between items-center z-40 bg-[var(--background_header)]">
        {/* Logo */}
        <div
          onClick={() => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" }); // scroll ke atas
            } else {
              navigate("/");
              navigate(0); // refresh kalau sudah di halaman yang sama
            }
          }}
          className="w-60 cursor-pointer"
        >
          <img src={logo} alt="Logo" className="w-full h-15 object-contain" />
        </div>

        {/* Desktop Menu */}
        <div
          className="hidden md:flex gap-4 items-center justify-end relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll ke atas
              } else {
                navigate("/");
                navigate(0); // refresh kalau sudah di halaman yang sama
              }
            }}
            className="text-button cursor-pointer"
            style={{ color: "var(--color_text_header)" }}
          >
            Beranda
          </button>

          <button
            onClick={() => navigate("/informasi")}
            className="text-button cursor-pointer"
            style={{ color: "var(--color_text_header)" }}
          >
            Informasi
          </button>

          <button
            onClick={() => navigate("/tutorial")}
            className="text-button cursor-pointer"
            style={{ color: "var(--color_text_header)" }}
          >
            Tutorial
          </button>

          <ThemeToggle theme={theme} setTheme={setTheme} />

          {user?.username ? (
            <>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="btn-profile"
              >
                {getUserInitial(user)}
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-12 w-40 rounded shadow-md overflow-hidden bg-[var(--background_button)]">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/profil");
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
          {/* btn profile / btn hamburger */}
          {user?.username ? (
            // Kalau user login → tampilkan avatar button
            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="btn-profile"
            >
              {getUserInitial(user)}
            </button>
          ) : (
            // Kalau belum login → tampilkan menu icon biasa
            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="text-header hover:brightness-80"
            >
              <i className="ri-menu-line"></i>
            </button>
          )}

          {showMobileMenu && (
            <div className="flex flex-col absolute top-14 right-0 w-64 rounded shadow-md p-2 gap-5 z-50 bg-[var(--background_header)]">
              {user?.username ? (
                <>
                  {/* Profil */}
                  <button
                    onClick={() => navigate("/profil")}
                    className="btn-default text-left"
                  >
                    Profil
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="btn-default text-left"
                  >
                    Beranda
                  </button>

                  <button
                    onClick={() => navigate("/informasi")}
                    className="btn-default text-left"
                  >
                    Informasi
                  </button>

                  {/* Tutorial */}
                  <button
                    onClick={() => navigate("/tutorial")}
                    className="btn-default text-left"
                  >
                    Tutorial
                  </button>

                  {/* Logout */}
                  <button
                    onClick={() => setShowConfirmLogout(true)}
                    className="btn-default text-left"
                  >
                    Logout
                  </button>

                  {/* Theme */}
                  <ThemeToggle theme={theme} setTheme={setTheme} />
                </>
              ) : (
                <>
                  {/* Login */}
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-default text-left"
                  >
                    Login
                  </button>

                  {/* Tutorial */}
                  <button
                    onClick={() => navigate("/tutorial")}
                    className="btn-default text-left"
                  >
                    Tutorial
                  </button>

                  {/* Theme */}
                  <ThemeToggle theme={theme} setTheme={setTheme} />
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Modal konfirmasi logout */}
      {showConfirmLogout && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-[var(--background)]/80">
          <div className="p-6 rounded shadow-md w-full max-w-lg bg-[var(--background_component)]">
            <p className="text-title mb-4 text-center">
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
          <LoadingOverlay show={isLoggingOut} message="Sedang logout..." />
        </div>
      )}
    </>
  );
};

export default Header;
