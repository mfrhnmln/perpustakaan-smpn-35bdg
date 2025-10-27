import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDisableBodyScroll } from "../../Service/useDisableBodyScroll";
import BooksData from "../../Data/BooksData";

const BookDeleteButton = ({ book, fetchBooks }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useDisableBodyScroll(showModal);

  useEffect(() => {
    if (showModal) setLoading(false);
  }, [showModal]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  const handleDelete = () => {
    setLoading(true);
    try {
      const index = BooksData.findIndex((b) => b.id === book.id);
      if (index === -1) throw new Error("Buku tidak ditemukan");
      BooksData.splice(index, 1);
      toast.success(`Buku "${book.title}" berhasil dihapus.`);
      fetchBooks?.();
    } catch (err) {
      toast.error(err.message || "Gagal menghapus buku");
      console.error(err);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="btn-cancel"
      >
        <i className="ri-delete-bin-fill"></i>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[999] flex justify-center items-center bg-[var(--background_component)]/80">
          <div className="w-full max-w-2xl p-6 rounded shadow-lg bg-[var(--background_component)]">
            <h1 className="text-title mb-10">Konfirmasi Hapus</h1>
            {/* pesan */}
            <p className="text-left text-paragraph">
              Yakin ingin menghapus buku <strong>{book.title}</strong>?
            </p>

            {/* tombol */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="btn-default"
              >
                Batal
              </button>
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
      )}
    </>
  );
};

export default BookDeleteButton;
