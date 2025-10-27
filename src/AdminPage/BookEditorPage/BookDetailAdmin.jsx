import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookData } from "../../Service/BookData";
import BookCover from "../BookEditor/BookCover"; // pastikan path sesuai

const BookDetailAdmin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { books, loading } = BookData();

  const [book, setBook] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    if (!loading) {
      const found = books.find((b) => b.slug === slug);
      setBook(found || null);
    }
  }, [books, slug, loading]);

  if (loading) return <div>Loading data buku...</div>;
  if (!book) return <div>Buku tidak ditemukan</div>;

  const formatArray = (arr) =>
    Array.isArray(arr) ? arr.join(", ") : arr || "-";

  const handleEdit = () => navigate(`/admin/buku/${book.slug}/edit`);
  const handleBack = () => navigate("/admin/buku");

  return (
    <div className="p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row text-paragraph items-start gap-5">
        {/* Cover */}
        <div>
          <BookCover book={book} isEditing={false} />
        </div>

        {/* Data buku */}
        <table className="w-full text-left">
          <tbody>
            {/* judul buku */}
            <tr>
              <td className="font-semibold p-4 border-b w-[200px]">Judul</td>
              <td className="p-4 border-b">{book.title || "-"}</td>
            </tr>

            {/* penulis */}
            <tr>
              <td className="font-semibold p-4 border-b">Penulis</td>
              <td className="p-4 border-b">{formatArray(book.author)}</td>
            </tr>

            {/* penerbit */}
            <tr>
              <td className="font-semibold p-4 border-b">Penerbit</td>
              <td className="p-4 border-b">{book.publisher || "-"}</td>
            </tr>

            {/* subject */}
            <tr>
              <td className="font-semibold p-4 border-b">Subjek</td>
              <td className="p-4 border-b">{formatArray(book.subject)}</td>
            </tr>

            {/* isbn/issn */}
            <tr>
              <td className="font-semibold p-4 border-b">ISBN</td>
              <td className="p-4 border-b">{book.isbn || "-"}</td>
            </tr>

            {/* tahun terbit */}
            <tr>
              <td className="font-semibold p-4 border-b">Tahun Terbit</td>
              <td className="p-4 border-b">{book.publication_year || "-"}</td>
            </tr>

            {/* publication_place */}

            {/* lokasi rak */}
            <tr>
              <td className="font-semibold p-4 border-b">Lokasi Rak</td>
              <td className="p-4 border-b">{book.storage_location || "-"}</td>
            </tr>

            {/* nomor panggil */}
            <tr>
              <td className="font-semibold p-4 border-b">Nomor Panggil</td>
              <td className="p-4 border-b">{book.call_number || "-"}</td>
            </tr>

            {/* kondisi */}
            <tr>
              <td className="font-semibold p-4 border-b">Kondisi</td>
              <td className="p-4 border-b">{book.book_condition || "-"}</td>
            </tr>

            {/* deskripsi fisik */}
            <tr>
              <td className="font-semibold p-4 border-b">Deskripsi Fisik</td>
              <td className="p-4 border-b">
                {book.physical_description || "-"}
              </td>
            </tr>

            {/* judul seri */}
            <tr>
              <td className="font-semibold p-4 border-b">Judul Seri</td>
              <td className="p-4 border-b">{book.series_title || "-"}</td>
            </tr>

            {/* format */}
            <tr>
              <td className="font-semibold p-4 border-b">Format</td>
              <td className="p-4 border-b">{book.book_format || "-"}</td>
            </tr>

            {/* stock */}
            <tr>
              <td className="font-semibold p-4 border-b">Stok</td>
              <td className="p-4 border-b">{book.stock ?? 0}</td>
            </tr>

            {/* stock pinjaman */}
            <tr>
              <td className="font-semibold p-4 border-b">Stok Tersedia</td>
              <td className="p-4 border-b">{book.availability_stock ?? 0}</td>
            </tr>

            {/* jumlah lihat */}
            <tr>
              <td className="font-semibold p-4 border-b">Jumlah Dilihat</td>
              <td className="p-4 border-b">{book.view ?? 0}</td>
            </tr>

            {/* jumlah suka */}
            <tr>
              <td className="font-semibold p-4 border-b">Jumlah Disukai</td>
              <td className="p-4 border-b">{book.like ?? 0}</td>
            </tr>

            {/* abstrak */}
            <tr>
              <td className="font-semibold p-4 border-b">Abstrak</td>
              <td className="p-4 border-b text-justify">
                {book.abstract || "-"}
              </td>
            </tr>

            {/* qrcode */}
            <tr>
              <td className="font-semibold p-4 border-b">QR Code</td>
              <td className="p-4 border-b">
                {book.qrcode ? (
                  <img
                    src={book.qrcode}
                    alt="QR Code"
                    className="h-40 cursor-pointer"
                    onClick={() => setShowQr(true)}
                  />
                ) : (
                  "-"
                )}
              </td>
            </tr>

            {/* pdf */}
            <tr>
              <td className="font-semibold p-4 border-b">File PDF</td>
              <td className="p-4 border-b">
                {book.pdf ? (
                  <button
                    onClick={() => setShowPdf(book.pdf)}
                    className="px-4 py-2 btn-default rounded"
                  >
                    e-Book {book.title || "-"}
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tombol Edit & Kembali */}
      <div className="flex w-full justify-end mt-10 gap-4 ">
        <button onClick={handleBack} className="btn-default">
          Kembali
        </button>
        <button onClick={handleEdit} className="btn-edit">
          <i className="ri-edit-2-fill"></i>
        </button>
      </div>

      {/* Modal QR */}
      {showQr && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-[var(--background_component)]/80"
          onClick={() => setShowQr(false)}
        >
          <div
            className="flex flex-col items-center justify-center p-6 rounded-lg bg-[var(--background)] text-paragraph"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="w-full text-center font-bold border-b pb-2 ">Perpustakaan Kota Bandung</p>
            <p className="text-center font-bold mb-2">{book.title} - {book.stock}</p>
            <img src={book.qrcode} alt="QR Code Besar" className="w-40"/>
            <p className="text-center mt-2">{book.publisher}</p>
          </div>
        </div>
      )}

      {/* Modal PDF */}
      {showPdf && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-[var(--background_component)]/80"
          onClick={() => setShowPdf(false)}
        >
          <div
            className="w-[80vw] h-[90vh] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={showPdf}
              title="PDF Viewer"
              className="w-full h-full rounded-b-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailAdmin;
