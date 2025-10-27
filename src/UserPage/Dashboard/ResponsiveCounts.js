import { useState, useEffect } from "react";

export const useResponsiveCounts = () => {
  const [visibleCountBook, setVisibleCountBook] = useState(2);
  const [visibleCountClassification, setVisibleCountClassification] = useState(1);

  useEffect(() => {
    const updateCount = () => {
      // untuk klasifikasi
      if (window.innerWidth >= 1024) {
        setVisibleCountClassification(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCountClassification(2);
      } else {
        setVisibleCountClassification(1);
      }

      // untuk buku
      if (window.innerWidth >= 1024) {
        setVisibleCountBook(5);
      } else if (window.innerWidth >= 768) {
        setVisibleCountBook(3);
      } else {
        setVisibleCountBook(2);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return { visibleCountBook, visibleCountClassification };
};
