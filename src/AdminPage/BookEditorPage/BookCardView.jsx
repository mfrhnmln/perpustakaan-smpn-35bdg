import { useNavigate } from "react-router-dom";
import BookCover from "../BookEditor/BookCover";
import BookEditButton from "../BookEditor/BookEditButton";
import BookDeleteButton from "../BookEditor/BookDeleteButton";


const BookCardView = ({ book, fetchBooks }) => {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/admin/buku/${book.slug}/detail`);
  };

  return (
    <div
      className="flex flex-col w-full p-4 rounded- shadow transition hover:shadow-lg border border-[var(--color_text_title)]/30 cursor-pointer"
      onClick={handleClickCard}
    >
      {/* Bagian atas: Cover + Info */}
      <div className="flex gap-5">
        {/* Cover */}
        <div className="py-2">
          <BookCover book={book} isEditing={false} />
        </div>

        {/* Info dalam tabel */}
        <div className="flex flex-col w-full justify-start text-paragraph">
          <table className="w-full text-left">
            <tbody>
              {/* judul */}
              <tr>
                <td className="font-semibold py-1">Judul</td>
                <td className="py-1">{book.title || "-"}</td>
              </tr>

              {/* penulis */}
              <tr>
                <td className="font-semibold py-1">Penulis</td>
                <td className="py-1">
                  {Array.isArray(book.author)
                    ? book.author.join(", ")
                    : book.author || "Tidak diketahui"}
                </td>
              </tr>

              {/* subjek */}
              <tr>
                <td className="font-semibold py-1">Subjek</td>
                <td className="py-1">
                  {Array.isArray(book.subject)
                    ? book.subject.join(", ")
                    : book.subject || "-"}
                </td>
              </tr>

              {/* isbn/issn */}
              <tr>
                <td className="font-semibold py-1">ISBN</td>
                <td className="py-1">{book.isbn || "-"}</td>
              </tr>

              {/* no panggil */}
              <tr>
                <td className="font-semibold py-1">Nomor Panggil</td>
                <td className="py-1">{book.call_number || "-"}</td>
              </tr>

              {/* stok buku */}
              <tr>
                <td className="font-semibold py-1">Stok Tersedia</td>
                <td className="py-1">{book.availability_stock ?? 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tombol aksi → pakai komponen */}
      <div className="flex justify-end gap-4 mt-4">
        <BookEditButton book={book} />
        <BookDeleteButton book={book} fetchBooks={fetchBooks} />
      </div>
    </div>
  );
};

export default BookCardView;
