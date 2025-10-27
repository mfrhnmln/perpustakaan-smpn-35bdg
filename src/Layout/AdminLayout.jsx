import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../AdminPage/Component/HeaderAdmin";
import SidebarAdmin from "../AdminPage/Component/SidebarAdmin";
import FooterAdmin from "../AdminPage/Component/FooterAdmin";

const AdminLayout = () => {
  const [theme] = useState("system"); // default system
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) setIsSidebarOpen(true);
    else setIsSidebarOpen(false);
  }, [isDesktop]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-screen w-full transition-all">
      <SidebarAdmin
        isOpen={isSidebarOpen}
        isDesktop={isDesktop}
        toggleSidebar={toggleSidebar}
      />

      <main
        className={`transition-all duration-300 flex-1 ${
          isDesktop ? (isSidebarOpen ? "pl-64" : "pl-16") : "pl-0"
        }`}
      >
        {/* Header */}
        <HeaderAdmin toggleSidebar={toggleSidebar} />

        <div className="min-h-screen py-5 md:p-5 bg-[var(--background)]">
          <Outlet />
        </div>

        {/* Footer */}
        <FooterAdmin />
      </main>
    </div>
  );
};

export default AdminLayout;
