// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisableBodyScroll } from "../../Service/useDisableBodyScroll";

const classifications = [
  { range: "000-099", name: "Karya Umum", icon: "📚" },
  { range: "100-199", name: "Filsafat & Psikologi", icon: "🧠" },
  { range: "200-299", name: "Agama", icon: "🙏" },
  { range: "300-399", name: "Ilmu Sosial", icon: "👥" },
  { range: "400-499", name: "Bahasa", icon: "📝" },
  { range: "500-599", name: "Ilmu Murni", icon: "🔬" },
  { range: "600-699", name: "Ilmu Terapan", icon: "⚙️" },
  { range: "700-799", name: "Kesenian & Rekreasi", icon: "🎨" },
  { range: "800-899", name: "Kesusastraan", icon: "📖" },
  { range: "900-999", name: "Sejarah & Geografi", icon: "🌍" },
];

const ClassificationSection = ({
  isOpen,
  visibleCountClassification,
  setShowModal,
}) => {
  const navigate = useNavigate();
  useDisableBodyScroll(isOpen);
  return (
    <div>
      {/* Klasifikasi Buku */}
      <section className="w-full max-w-5xl mx-auto px-10">
        <h2 className="text-title text-center mb-4">
          Pilih klasifikasi koleksi perpustakaan
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {classifications
            .slice(0, visibleCountClassification)
            .map((classification, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/daftar-buku/${classification.range}`)}
                className="flex flex-col items-center justify-center p-6 text-center rounded-xl shadow-md bg-[var(--background_component)] hover:scale-105 transition cursor-pointer"
              >
                <p className="text-title mb-2">{classification.icon}</p>
                <p className="text-paragraph font-semibold">
                  {classification.name}
                </p>
                <p className="text-helper">{classification.range}</p>
              </div>
            ))}

          {/* tombol lihat semua */}
          <div
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center justify-center p-6 text-center rounded-xl shadow-md bg-[var(--background_component)] hover:scale-105 transition cursor-pointer"
          >
            <p className="text-title mb-2">➕</p>
            <p className="text-paragraph font-semibold">Lihat Semua</p>
          </div>
        </div>
      </section>

      {/* tombol lihat semua buku */}
      <div className="flex items-center justify-center mt-10">
        <button
          onClick={() => navigate("/daftar-buku")}
          className="btn-default"
        >
          lihat semua buku
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
          <div className="w-full md:max-w-[60vw] max-h-[85vh] rounded p-6 shadow-lg overflow-y-auto bg-[var(--background_component)]">
            <h2 className="text-title mb-4">Semua Klasifikasi</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              {classifications.map((classification, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setShowModal(false);
                    navigate(`/daftar-buku/${classification.range}`);
                  }}
                  className="cursor-pointer p-4 rounded-lg shadow bg-[var(--background_sidebar)]/80 hover:scale-105 transition"
                >
                  <p className="text-title mb-2">{classification.icon}</p>
                  <p
                    className="text-paragraph font-semibold"
                    style={{ color: "var(--color_text_header)" }}
                  >
                    {classification.name}
                  </p>
                  <p className="text-helper">{classification.range}</p>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-center  mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn-cancel"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassificationSection;
