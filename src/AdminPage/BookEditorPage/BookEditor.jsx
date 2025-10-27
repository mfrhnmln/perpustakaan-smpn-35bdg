import { useState } from "react";
import { toast } from "react-toastify";

// Custom hook (data & handler)
import { BookData } from "../../Service/BookData";
import LoadingOverlay from "../../Function/LoadingOverlay";

// Komponen internal
import BookAdd from "./BookAdd";
import BookView from "./BookView";
import FilterDataBook from "./FilterDataBook";

const BookEditor = () => {
  const {
    books,
    subjects,
    authors,
    loading,
    searchQuery,
    setSearchQuery,
    subjectFilter,
    setSubjectFilter,
    authorFilter,
    setAuthorFilter,
    sortBy,
    sortDirection,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleSort,
    fetchBooks,
  } = BookData();

  const [showModal, setShowModal] = useState(false);

  // Loading saat data buku dimuat
  if (loading)
    return <LoadingOverlay show={loading} message="Memuat data buku..." />;

  return (
    <div className="relative bg-[var(--background_component)]">
      <div className="flex justify-between px-5 py-10 text-left border-b border-[var(--color_text_title)]/30">
        {/* Judul Halaman */}
        <h1 className="text-title font-bold">Manajemen Buku</h1>

        {/* Tombol Tambah Buku */}
        <button
          onClick={() => {
            if (subjects.length === 0 || authors.length === 0) {
              toast.error("Isi subject dan author terlebih dahulu.");
              return;
            }
            setShowModal(true);
          }}
          className="btn-default"
        >
          Tambah Buku
        </button>
      </div>

      <div className="px-5">
        {/* Modal tambah buku */}
        {showModal && authors.length > 0 && subjects.length > 0 && (
          <BookAdd
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={(book) => handleAdd(book, () => setShowModal(false))}
            authors={authors}
            subjects={subjects}
          />
        )}

        {/* Filter pencarian + filter subject & author */}
        <FilterDataBook
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          subjects={subjects}
          authors={authors}
          totalBooks={books.length}
        />

        {/* Daftar buku (pakai BookView untuk switch table/card) */}
        <BookView
          books={books}
          authors={authors}
          subjects={subjects}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onSort={handleSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
          fetchBooks={fetchBooks}
        />
      </div>
    </div>
  );
};

export default BookEditor;
