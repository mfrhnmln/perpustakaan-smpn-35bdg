import { useEffect, useState } from "react";

const BtnScrollTopButton = () => {
  const [show, setShow] = useState(false);

  // pemanggilan fungsi theme dan teks

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300); // Tampilkan jika scroll lebih dari 300px
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="btn-profile text-title fixed bottom-10 right-10 w-12 h-12 rounded-full shadow-md z-40"
    >
      <i className="ri-skip-up-fill"></i>
    </button>
  );
};

export default BtnScrollTopButton;
