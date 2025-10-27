import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = ({ isOpen, toggleSidebar, isDesktop }) => {
  const location = useLocation();

  // tertututp otomasil saat berpindah halaman untuk tampilan mobile dan tablet
  useEffect(() => {
    if (!isDesktop && isOpen) {
      toggleSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const menuItems = [
    {
      icon: "ri-bar-chart-box-line",
      label: "Statistik",
      path: "/admin/dashboard",
    },
    { icon: "ri-book-2-line", label: "Buku", path: "/admin/buku" },
    { icon: "ri-finder-line", label: "Subjek", path: "/admin/subjek" },
    {
      icon: "ri-quill-pen-ai-line",
      label: "Penulis",
      path: "/admin/penulis",
    },
    {
      icon: "ri-mail-send-line",
      label: "Pengajuan",
      path: "/admin/pengajuan/peminjaman/buku",
    },
    {
      icon: "ri-history-line",
      label: "Riwayat",
      path: "/admin/riwayat/peminjaman/buku",
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 bg-[var(--background_sidebar)]
        ${isDesktop ? (isOpen ? "w-64" : "w-16") : isOpen ? "w-64" : "w-0"} ${
        !isDesktop && "overflow-hidden"
      }
      `}
    >
      {/* Toggle Button */}
      <div className="flex relative p-4 mt-2 lg:mt-5">
        <div
          className="group flex items-center justify-center cursor-pointer relative w-8 h-8"
          onClick={toggleSidebar}
        >
          {/* Icon: school (default) */}
          <i
            className={`ri-school-line text-header absolute transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "group-hover:opacity-0 opacity-100"
            }`}
          />

          {/* Icon: menu (on hover when sidebar closed) */}
          <i
            className={`ri-menu-line text-header absolute transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "group-hover:opacity-100 opacity-0"
            }`}
          />

          {/* saat sidebar tertutup dan icon di hover maka muncul label */}
          {!isOpen && (
            <span className="text-paragraph absolute left-11 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-[var(--background_sidebar)]">
              Open Sidebar
            </span>
          )}
        </div>
      </div>

      {/* navigasi Sidebar + fungsi hover */}
      <nav
        className="flex flex-col gap-1 px-2 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 80px)", // 80px = tinggi area toggle di atas
          overflowX: "hidden", // Menambahkan untuk mencegah scroll horizontal
        }}
      >
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className="text-sidebar group relative flex items-center gap-5 transition-colors rounded-md"
              style={{
                backgroundColor: isActive
                  ? "var(--background_button)"
                  : "transparent",
              }}
            >
              <i
                className={`${item.icon} text-header px-3 py-2 var(--color_text-header)`}
              />
              {isOpen && <span>{item.label}</span>}

              {!isOpen && (
                <span className="text-paragraph absolute left-14 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-[var(--background_sidebar)]">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* hamburger btn saat sidebar terbuka + hover label */}
      {isOpen && (
        <div
          className="absolute top-7 right-5 sm:top-6 lg:top-7 group cursor-pointer"
          onClick={toggleSidebar}
        >
          <i className="ri-menu-line text-header transition-transform duration-200 group-hover:rotate-90" />
          <span className="text-sidebar absolute top-full mt-1 -right-0 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap  bg-[var(--background_header)]">
            Tutup Sidebar
          </span>
        </div>
      )}
    </aside>
  );
};

export default SidebarAdmin;
