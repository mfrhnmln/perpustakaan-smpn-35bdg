import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import BooksData from "../../Data/BooksData";

// helper: cek klasifikasi masuk dalam range
const isInRange = (value, range) => {
  if (!value || !range) return false;
  const num = parseInt(value, 10); // contoh book.classification = "297.07" → jadi 297
  const [min, max] = range.split("-").map((n) => parseInt(n, 10));
  return num >= min && num <= max;
};

const BookList = ({
  searchQuery,
  subjectFilter,
  authorFilter,
  classificationFilter,
  languageFilter,
  onlyAvailable,
}) => {
  const navigate = useNavigate();

  const filteredBooks = useMemo(() => {
    let books = [...BooksData];

    // Search (judul + author + subject)
    if (searchQuery) {
      books = books.filter((book) =>
        [book.title, ...(book.author || []), ...(book.subject || [])]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // Filter Subject
    if (subjectFilter) {
      books = books.filter((book) =>
        Array.isArray(book.subject)
          ? book.subject.includes(subjectFilter)
          : book.subject === subjectFilter
      );
    }

    // Filter Author
    if (authorFilter) {
      books = books.filter((book) =>
        Array.isArray(book.author)
          ? book.author.includes(authorFilter)
          : book.author === authorFilter
      );
    }

    // Filter Klasifikasi
    if (classificationFilter) {
      if (classificationFilter.includes("-")) {
        // range (dipakai dashboard)
        books = books.filter((book) =>
          isInRange(book.classification, classificationFilter)
        );
      } else {
        // detail (dipakai sidebar)
        books = books.filter(
          (book) => book.classification === classificationFilter
        );
      }
    }

    // Filter Bahasa
    if (languageFilter) {
      books = books.filter((book) => book.content_language === languageFilter);
    }

    // Filter Ketersediaan
    if (onlyAvailable) {
      books = books.filter(
        (book) => book.is_active === "true" && book.availability_stock > 0
      );
    }

    // 🔄 Urutkan berdasarkan terbaru (id terbesar)
    books.sort((a, b) => Number(b.id) - Number(a.id));

    return books;
  }, [
    searchQuery,
    subjectFilter,
    authorFilter,
    classificationFilter,
    languageFilter,
    onlyAvailable,
  ]);

  return (
    <div className="relative">
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-5 gap-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => navigate(`/buku/${book.slug}/detail`)}
            />
          ))}
        </div>
      ) : (
        <p className="flex py-20 justify-center text-subtitle">
          Buku dengan judul, subjek, penulis, klasifikasi, bahasa, atau status
          ini belum ada
        </p>
      )}
    </div>
  );
};

export default BookList;
