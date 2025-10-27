// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const location = useLocation();

  // fungsi btn dengan ID (Contoh "kontak" pada header)
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Scroll smooth ke elemen
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // delay kecil untuk memastikan halaman sudah render
      }
    }
  }, [location]);

  return null;
};

export default ScrollToHash;
