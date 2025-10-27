// 2. SearchInput.jsx
import { useRef } from "react";

const SearchInput = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full items-center gap-2 px-3 py-2 border rounded-xl border-[var(--background_button)] text-[var(--color_text_title)]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari buku..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
        <i
          onClick={handleIconClick}
          className="ri-search-2-line cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SearchInput;
