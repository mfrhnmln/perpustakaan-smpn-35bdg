import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingOverlay from "../../Function/LoadingOverlay";
import BooksData from "../../Data/BooksData";

const BookReader = () => {
  const { bookSlug } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mencegah scroll saat mode baca buku
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Ambil buku berdasarkan slug dari dataset
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundBook = BooksData.find((b) => b.slug === bookSlug);
      if (foundBook) {
        setBook(foundBook);
      } else {
        toast.error("Buku tidak ditemukan.");
        setBook(null);
      }
      setLoading(false);
    }, 800); // kasih delay sedikit biar LoadingOverlay sempat muncul
  }, [bookSlug]);

  // Handle tombol Like
  const handleLike = () => {
    if (book && !likeStatus) {
      setLikeStatus(true);
      toast.success("Terima kasih telah menyukai buku ini!");
    }
  };

  if (loading) {
    return <LoadingOverlay show={true} message="Memuat data buku..." />;
  }

  if (!book) {
    return <div className="text-subtitle p-6">Buku tidak ditemukan.</div>;
  }

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full flex flex-col bg-[var(--background)]">
      <LoadingOverlay show={loading} message="Memuat data buku..." />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 shadow-md bg-[var(--background_header)]">
        {/* Logo dummy */}
        <div className="w-1/5">
          <img
            src="Img\logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Judul Buku */}
        <div className="w-3/5 text-center">
          <h1
            className="text-subtitle font-semibold"
            style={{ color: "var(--color_text_header)" }}
          >
            {book.title}
          </h1>
        </div>

        {/* Tombol kembali */}
        <div className="flex w-1/5 items-center justify-end">
          <button
            onClick={() => navigate(-1)}
            className="text-subtitle font-bold cursor-pointer"
            style={{ color: "var(--color_text_header)" }}
          >
            <i className="ri-close-large-fill mr-1" />
          </button>
        </div>
      </div>

      {/* Viewer PDF */}
      <div className="flex-1 relative">
        {book.pdf ? (
          <iframe
            src={`${book.pdf}#toolbar=0`}
            title={`PDF ${book.title}`}
            className="w-full h-full rounded shadow"
            allowFullScreen
          />
        ) : (
          <p className="text-subtitle text-center pt-10">
            File PDF tidak tersedia, silahkan pinjam buku fisik di perpustakaan
          </p>
        )}

        {/* Tombol Like */}
        <button
          onClick={handleLike}
          title="Suka"
          className="absolute right-10 bottom-10"
        >
          <i
            className={`ri-thumb-up-line text-4xl ${
              likeStatus
                ? "text-[var(--color_success)]"
                : "text-[var(--color_info)]"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default BookReader;
