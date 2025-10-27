import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="bg-[var(--background_header)] text-helper"
      style={{ color: "var(--color_text_header)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {/* Kiri */}
        <div>
          <img
            src="Img/logo.png"
            alt="Logo Perpustakaan"
            className="h-full max-h-15 mb-4"
          />
          <h2
            className="text-paragraph font-bold mb-4"
            style={{ color: "var(--color_text_header)" }}
          >
            PERPUSTAKAAN - SMPN35BDG
          </h2>
          <ul className="flex md:flex-col gap-2">
            <li>
              <button
                onClick={() => {
                  if (window.location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll ke atas
                  } else {
                    navigate("/");
                    navigate(0); // refresh kalau sudah di halaman yang sama
                  }
                }}
                className="text-helper text-left cursor-pointer"
                style={{ color: "var(--color_text_header)" }}
              >
                Beranda
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/informasi")}
                className="text-helper text-left cursor-pointer"
                style={{ color: "var(--color_text_header)" }}
              >
                Informasi
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/tutorial")}
                className="text-helper text-left cursor-pointer"
                style={{ color: "var(--color_text_header)" }}
              >
                Tutorial
              </button>
            </li>
          </ul>
        </div>

        {/* Tengah */}
        <div>
          <h2
            className="text-paragraph font-bold mb-4"
            style={{ color: "var(--color_text_header)" }}
          >
            Tentang Kami
          </h2>
          <p className="leading-relaxed">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            consequatur, rem soluta quasi aliquid ducimus enim eveniet velit
            placeat sint earum omnis! Quos saepe provident assumenda consequatur
            facere a corporis!
          </p>
        </div>

        {/* Kanan */}
        <div>
          <h2
            className="text-paragraph font-bold mb-4"
            style={{ color: "var(--color_text_header)" }}
          >
            Cari
          </h2>
          <p className="mb-2">
            Masukkan satu atau lebih kata kunci dari judul, pengarang, atau
            subjek
          </p>
          <div
            className="flex w-full mb-4 border border-[var(--color_text_title)]/30 rounded-md text-helper"
            style={{ color: "var(--color_text_header)" }}
          >
            <input
            id="search-keywords"
              type="text"
              placeholder="Masukkan kata kunci"
              className="w-2/3 px-3 py-2"
            />
            <button className="w-1/3 px-4 py-2 rounded-r-md bg-[var(--background_button)]">
              Cari
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-default"
            >
              <i className="ri-github-fill"></i>
              Kontribusi di GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Bawah */}
      <div
        className="border-t border-[var(--color_text_title)]/30 py-4 text-center text-helper"
        style={{ color: "var(--color_text_header)" }}
      >
        @Copyright 2025. All Rights Reserved by mfarhanmaulana
      </div>
    </footer>
  );
};

export default Footer;
