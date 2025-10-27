import { Outlet } from "react-router-dom";
import Header from "../UserPage/Components/Header";
import Footer from "../UserPage/Components/Footer";
import { useState, useEffect } from "react";

const UserLayout = () => {
  const [theme] = useState("system"); // default system

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className="flex min-h-screen flex-col transition-all"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Header */}
      <Header />

      {/* Konten utama */}
      <main
        className="flex-1 min-h-screen"
        style={{ backgroundColor: "var(--background)" }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
