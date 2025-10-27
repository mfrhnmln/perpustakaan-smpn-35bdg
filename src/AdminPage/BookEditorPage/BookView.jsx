import { useState } from "react";
import BookTableView from "./BookTableView";
import BookCardView from "./BookCardView";

const BookView = ({ books, authors, genres, onUpdate, onDelete, onSort, sortBy, sortDirection, fetchBooks }) => {
  const [viewMode, setViewMode] = useState("table"); // "table" | "card"

  return (
    <div className="py-5">
      {/* Tombol switch tampilan */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setViewMode("table")}
          className={`${viewMode === "table" ? "btn-save" : "btn-default"}`}
        >
          <i className="ri-grid-line text-button"></i>
        </button>
        <button
          onClick={() => setViewMode("card")}
          className={`${viewMode === "card" ? "btn-save" : "btn-default"}`}
        >
          <i className="ri-info-card-line text-button"></i>
        </button>
      </div>

      {/* Tampilkan sesuai mode */}
      {viewMode === "table" ? (
        <BookTableView
          books={books}
          authors={authors}
          genres={genres}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onSort={onSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
          fetchBooks={fetchBooks}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {books.length === 0 ? (
            <div className="text-subtitle text-center py-20 col-span-full">
              Belum ada buku tersedia.
            </div>
          ) : (
            books.map((book) => (
              <BookCardView
                key={book.id}
                book={book}
                authors={authors}
                genres={genres}
                onUpdate={onUpdate}
                onDelete={onDelete}
                fetchBooks={fetchBooks}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookView;
