const BookActive = ({ book, handleToggleAktif }) => {
  const isChecked = !!book.is_active;

  const onChange = (e) => {
    handleToggleAktif(book.id, e.target.checked);
  };

  return (
    <label className="relative inline-block w-20 h-9 cursor-pointer">
      <input
        name="toggleactive"
        type="checkbox"
        className="opacity-0 w-0 h-0 peer"
        checked={isChecked}
        onChange={onChange}
      />

      {/* Background switch */}
      <span
        className="absolute inset-0 rounded-full flex items-center justify-center font-bold transition-colors duration-300"
        style={{
          backgroundColor: isChecked
            ? "var(--color_success)"
            : "var(--color_error)",
        }}
      >
        {/* {isChecked ? "Aktif" : "Nonaktif"} */}
      </span>

      {/* Bola toggle */}
      <span
        className={`absolute top-1 left-1 w-7 h-7 rounded-full transition-transform duration-300 bg-[var(--color_text_button)] ${
          isChecked ? "translate-x-11" : ""
        }`}
      />
    </label>
  );
};

export default BookActive;
