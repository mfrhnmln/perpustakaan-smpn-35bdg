import { useNavigate } from "react-router-dom";

const BookEditButton = ({ book }) => {
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation(); // supaya klik tombol tidak trigger card
    if (book?.slug) {
      navigate(`/admin/buku/${book.slug}/edit`);
    } else {
      console.warn("Slug tidak ditemukan pada objek book:", book);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEditClick}
      className="btn-edit"
    >
      <i className="ri-edit-2-fill"></i>
    </button>
  );
};

export default BookEditButton;
