import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import BooksData from "../../Data/BooksData";
import BorrowBookPage from "./BorrowBookPage";

const BookDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // State untuk modal
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  // Cari buku berdasarkan slug
  const book = BooksData.find((b) => b.slug === slug);

  if (!book) {
    return <p className="text-center py-10">Data buku tidak ditemukan.</p>;
  }

  const handleReadOnline = () => navigate(`/baca/online/${book.slug}`);
  // const handleBorrow = () => navigate(`/pinjam/${book.slug}`);

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen flex flex-col md:flex-row p-6 gap-6">
      {/* Cover */}
      <div className="flex w-full max-w-60 items-start">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full object-contain rounded-md shadow-md"
        />
      </div>

      {/* Detail Buku */}
      <div className="flex flex-col gap-4 w-full">
        {/* Judul dan Penulis */}
        <div className="flex flex-col gap-2 pb-4 border-b">
          <h2 className="text-subtitle font-semibold">{book.title}</h2>
          <div>
            {Array.isArray(book.author) ? (
              book.author.map((author, idx) => (
                <button
                  key={idx}
                  className="text-paragraph hover:underline mr-2"
                  style={{ color: "var(--color_info)" }}
                  onClick={() =>
                    navigate("/daftar-buku", {
                      state: { author },
                    })
                  }
                >
                  {author}
                </button>
              ))
            ) : (
              <button
                className="text-paragraph hover:underline mr-2"
                style={{ color: "var(--color_info)" }}
                onClick={() =>
                  navigate("/daftar-buku", {
                    state: { author: book.author },
                  })
                }
              >
                {book.author}
              </button>
            )}
          </div>
        </div>

        {/* ketersediaan buku di perpustakaan */}
        <div className="pb-4 border-b border-[var(--color_text_title)]/30 space-y-2">
          <h2 className="text-subtitle font-semibold text-left">
            Ketersdiaan buku
          </h2>
          <p
            className="text-paragraph"
            style={{
              color:
                book.availability_stock > 0
                  ? ""
                  : "text-[var(--color_error)]",
            }}
          >
            {book.availability_stock > 0 ? (
              <>
                <span className="font-semibold">Stock Buku:</span>{" "}
                {book.availability_stock}
              </>
            ) : (
              <span
                className="text-paragraph"
                style={{ color: "var(--color_error)" }}
              >
                Buku sedang dipinjam, silahkan pinjam buku lain
              </span>
            )}
          </p>
        </div>

        {/* Data Buku */}
        <div className="flex flex-col w-full gap-4">
          <h2
            className="text-subtitle font-semibold text-left"
            style={{ color: "var(--color_text_title)" }}
          >
            Informasi Detail
          </h2>

          <table className="w-full border-collapse">
            <tbody className="text-paragraph">
              {/* call_number */}
              <tr>
                <td className="font-semibold w-40 py-1 align-top">
                  Nomor Panggil
                </td>
                <td>{book.call_number}</td>
              </tr>

              {/* publication_place, publisher, publication_year */}
              <tr>
                <td className="font-semibold py-1 align-top">Penerbit</td>
                <td>
                  {book.publication_place} : {book.publisher},{" "}
                  {book.publication_year}
                </td>
              </tr>

              {/* physical_description */}
              <tr>
                <td className="font-semibold py-1 align-top">
                  Deskripsi Fisik
                </td>
                <td>{book.physical_description}</td>
              </tr>

              {/* content_language */}
              <tr>
                <td className="font-semibold py-1 align-top">Bahasa</td>
                <td>{book.content_language}</td>
              </tr>

              {/* isbn */}
              <tr>
                <td className="font-semibold py-1 align-top">ISBN</td>
                <td>{book.isbn}</td>
              </tr>

              {/* classification */}
              <tr>
                <td className="font-semibold py-1 align-top">Klasifikasi</td>
                <td>{book.classification}</td>
              </tr>

              {/* book_format */}
              <tr>
                <td className="font-semibold py-1 align-top">Format</td>
                <td>{book.book_format}</td>
              </tr>

              {/* edition */}
              <tr>
                <td className="font-semibold py-1 align-top">Edisi</td>
                <td>{book.edition}</td>
              </tr>

              {/* volume */}
              <tr>
                <td className="font-semibold py-1 align-top">Volume</td>
                <td>{book.volume}</td>
              </tr>

              {/* subjects */}
              <tr>
                <td className="font-semibold py-1 align-top">Subjek</td>
                <td>
                  {Array.isArray(book.subject)
                    ? book.subject.join(", ")
                    : book.subject}
                </td>
              </tr>

              {/* book_condition */}
              <tr>
                <td className="font-semibold py-1 align-top">Kondisi Buku</td>
                <td>{book.book_condition}</td>
              </tr>

              {/* storage_location */}
              <tr>
                <td className="font-semibold py-1 align-top">Lokasi Rak</td>
                <td>{book.storage_location}</td>
              </tr>

              {/* abstract */}
              <tr>
                <td className="font-semibold py-1 align-top">Abstract</td>
                <td>{book.abstract}</td>
              </tr>

              {/* view_count */}
              <tr>
                <td className="font-semibold py-1 align-top">Dilihat</td>
                <td>{book.view} kali</td>
              </tr>

              {/* like_count */}
              <tr>
                <td className="font-semibold py-1 align-top">Disukai</td>
                <td>{book.like} orang</td>
              </tr>

              {/* qrcode */}
              <tr>
                <td className="font-semibold py-1 align-top">QR Code</td>
                <td>
                  <img
                    src={book.qrcode}
                    alt="QR Code"
                    className="w-24 h-24 object-contain"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4 mt-10">
          <button onClick={() => navigate("/")} className="btn-default">
            Kembali
          </button>
          <button onClick={handleReadOnline} className="btn-default">
            Baca Online
          </button>
          <button
            onClick={() => setShowBorrowModal(true)}
            className="btn-default"
            disabled={book.availability_stock <= 0}
          >
            Pinjam Buku
          </button>
        </div>
      </div>
      {/* Modal Pinjam Buku */}
      {showBorrowModal && (
        <BorrowBookPage book={book} onClose={() => setShowBorrowModal(false)} />
      )}
    </div>
  );
};

export default BookDetail;
