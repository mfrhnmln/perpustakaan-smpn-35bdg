import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BorrowBookPage = ({ book, onClose }) => {
  const modalRef = useRef(null);
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const navigate = useNavigate();

  // tutup modal kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk meminjam buku.");
      return;
    }

    if (!nama || !kelas) {
      toast.error("Nama dan kelas wajib diisi.");
      return;
    }

    console.log("Peminjaman:", {
      user_id: user.id,
      book_id: book.id,
      nama,
      kelas,
    });

    toast.success("Permintaan peminjaman berhasil dikirim!");
    onClose();

    // ⬅️ langsung redirect ke halaman utama
    navigate("/");
  };

  if (!book) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-[var(--background)]/80">
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-[var(--background_component)] rounded-xl shadow-lg p-6 relative"
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-[var(--color_text_title)]"
        >
          <i className="ri-close-large-fill"></i>
        </button>

        {/* Info Buku */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={book.cover}
            alt={book.title}
            className="w-1/3 rounded-lg object-contain"
          />
          <h2 className="text-subtitle font-bold text-center">{book.title}</h2>
          <p className="text-paragraph text-center">
            {Array.isArray(book.author) ? book.author.join(", ") : book.author}
          </p>
        </div>

        {/* Form Input */}
        <div className="mb-4 text-paragraph">
          <label className="block mb-1 font-medium">Nama</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Nama lengkap"
          />
        </div>

        <div className="mb-6 text-paragraph">
          <label className="block mb-1 font-medium">Kelas</label>
          <input
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Contoh: 9-A"
          />
        </div>

        {/* Tombol Submit */}
        <button
          onClick={handleSubmit}
          className="btn-save w-full py-2 px-4 rounded"
        >
          Pinjam Buku
        </button>
      </div>
    </div>
  );
};

export default BorrowBookPage;
