import BookCard from "../Book/BookCard";
import { useNavigate } from "react-router-dom";

const PopularBooksSection = ({ books, popularIndex, visibleCountBook }) => {
  const navigate = useNavigate();

  const getVisibleItems = (items, startIndex, count) => {
    return Array.from({ length: count }, (_, i) => 
      items[(startIndex + i) % items.length]
    );
  };

  return (
    <section className="w-full max-w-5xl mx-auto">
      <h2 className="text-title mb-4">Yang Populer di Koleksi Kami</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {getVisibleItems(books, popularIndex, visibleCountBook).map(
          (book, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/buku/${book.slug}/detail`)}
              className="transition-all duration-500 cursor-pointer"
            >
              <BookCard book={book} />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default PopularBooksSection;
