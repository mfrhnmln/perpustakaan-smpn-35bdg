import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCover from "../BookEditor/BookCover";
import BookEditButton from "../BookEditor/BookEditButton";
import BookDeleteButton from "../BookEditor/BookDeleteButton";

const BookTableView = ({ books, fetchBooks }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-20 text-subtitle">
        Belum ada buku tersedia.
      </div>
    );
  }

  const sortedBooks = [...books];
  if (sortConfig.key) {
    sortedBooks.sort((a, b) => {
      let aValue = "";
      let bValue = "";
      switch (sortConfig.key) {
        case "info":
          aValue = a.title || "";
          bValue = b.title || "";
          break;
        case "isbn":
          aValue = a.isbn || "";
          bValue = b.isbn || "";
          break;
        case "update":
          aValue = a.updated_at || ""; // pastikan ada properti updated_at
          bValue = b.updated_at || "";
          break;
        default:
          break;
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <>
      <table className="w-full text-center border-collapse">
        {/* header table */}
        <thead>
          <tr className="text-header-table bg-[var(--background_sidebar)]">
            {/* cover */}
            <th className="p-4 w-fit">COVER</th>

            {/* informasi buku */}
            <th
              className="p-4 w-full text-left cursor-pointer"
              onClick={() => handleSort("info")}
            >
              INFORMASI BUKU
              {sortConfig.key === "info" ? (
                sortConfig.direction === "asc" ? (
                  <i className="ri-arrow-up-s-fill"></i>
                ) : (
                  <i className="ri-arrow-down-s-fill"></i>
                )
              ) : (
                ""
              )}
            </th>

            {/* isbn/issn */}
            <th
              className="p-4 w-fit cursor-pointer"
              onClick={() => handleSort("isbn")}
            >
              ISBN/ISSN
              {sortConfig.key === "isbn" ? (
                sortConfig.direction === "asc" ? (
                  <i className="ri-arrow-up-s-fill"></i>
                ) : (
                  <i className="ri-arrow-down-s-fill"></i>
                )
              ) : (
                ""
              )}
            </th>

            {/* stok buku */}
            <th className="p-4 w-fit">STOK</th>

            {/* update terakhir */}
            <th
              className="p-4 w-fit cursor-pointer"
              onClick={() => handleSort("update")}
            >
              UPDATE
              {sortConfig.key === "update" ? (
                sortConfig.direction === "asc" ? (
                  <i className="ri-arrow-up-s-fill"></i>
                ) : (
                  <i className="ri-arrow-down-s-fill"></i>
                )
              ) : (
                ""
              )}
            </th>

            {/* btn aksi */}
            <th className="p-4 w-fit">AKSI</th>
          </tr>
        </thead>

        {/* content table */}
        <tbody>
          {sortedBooks.map((book) => (
            <tr
              key={book.id}
              className="text-content-table border-b border-[var(--color_text_title)]/30 hover:bg-[var(--background_sidebar)]/30"
            >
              {/* COVER */}
              <td
                className="p-2 cursor-pointer"
                onClick={() => setModalImage(book.cover)}
              >
                <BookCover book={book} isEditing={false} />
              </td>

              {/* INFORMASI BUKU */}
              <td
                className="p-4 text-left cursor-pointer"
                onClick={() => navigate(`/admin/buku/${book.slug}/detail`)}
              >
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">{book.title || "-"}</div>
                  <div>
                    {Array.isArray(book.author)
                      ? book.author.join(", ")
                      : book.author || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Subjek: </span>
                    {Array.isArray(book.subject)
                      ? book.subject.join(", ")
                      : book.subject || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Nomor Panggil: </span>
                    {book.call_number || "-"}
                  </div>
                </div>
              </td>

              {/* ISBN/ISSN */}
              <td className="p-4">{book.isbn || "-"}</td>

              {/* BANYAK BUKU */}
              <td className="p-4">{book.availability_stock ?? 0}</td>

              {/* UPDATE TERAKHIR */}
              <td className="p-4">2025-10-25 19:09:00</td>

              {/* AKSI */}
              <td className="p-4 flex flex-col gap-2">
                <BookEditButton book={book} />
                <BookDeleteButton book={book} fetchBooks={fetchBooks} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Cover */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-[var(--background_component)]/80"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Cover Buku"
            className="max-h-[70vh] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default BookTableView;
