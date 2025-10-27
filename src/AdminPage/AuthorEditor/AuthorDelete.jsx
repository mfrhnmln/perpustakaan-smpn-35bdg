import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthorDelete = ({ isOpen, onClose, author, fetchAuthors }) => {
  const [loading, setLoading] = useState(false);

  // Reset loading saat modal dibuka
  useEffect(() => {
    if (isOpen) setLoading(false);
  }, [isOpen]);

  // Tutup modal dengan Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Fungsi hapus penulis (local only, no API)
  const handleDelete = () => {
    setLoading(true);
    try {
      // ⬇️ simulasi delete data lokal
      toast.success(`Penulis "${author}" berhasil dihapus`);
      fetchAuthors(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Gagal menghapus penulis");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen || !author) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
      <div className="w-full max-w-xl p-6 rounded shadow-lg bg-[var(--background_component)]">
        {/* Judul Modal */}
        <h1 className="text-title font-bold mb-4">Konfirmasi Hapus</h1>

        {/* Pesan konfirmasi */}
        <p className="text-paragraph">
          Yakin ingin menghapus penulis{" "}
          <strong className="text-[var(--color_error)]">{author}</strong>?
        </p>

        {/* Tombol aksi */}
        <div className="flex justify-end gap-4 mt-10">
          {/* Tombol batal */}
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-default"
          >
            Batal
          </button>

          {/* Tombol hapus */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="btn-cancel"
          >
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDelete;
