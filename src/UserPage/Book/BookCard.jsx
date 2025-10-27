const BookCard = ({ book, onClick }) => {
  const handleClick = () => {
    onClick(book);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer rounded-md shadow-xl hover:scale-105 transition"
    >
      {/* Bungkus gambar dengan rasio 2:3 */}
      <div className="w-full aspect-[2/3]">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Info buku */}
      <div className="absolute bottom-0 w-full py-2 rounded-b-md bg-[var(--background_cover)]/80">
        <p className="text-coverjudulbuku font-semibold px-2 truncate">
          {book.title}
        </p>
        <p className="text-coverpenulisbuku px-2 truncate">{book.author}</p>
        <hr className="text-[var(--color_text_title)]/30 my-1" />
        <div className="flex justify-between px-2">
          <p className="text-coverpenulisbuku">{book.volume}</p>
          <p className="text-coverpenulisbuku flex justify-between gap-1">
            {book.view}
            <i className="ri-eye-fill" />
          </p>
        </div>
        {/* <p
          className={`text-xs ${
            book.availability_stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {book.availability_stock > 0 ? "Tersedia" : "Tidak tersedia"}
        </p> */}
      </div>
    </div>
  );
};

export default BookCard;
