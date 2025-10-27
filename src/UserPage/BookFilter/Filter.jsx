// Filter.jsx
import { useMemo } from "react";
import Select from "react-select";
import SearchInput from "./SearchInput";
import BooksData from "../../Data/BooksData";

const Filter = ({
  searchQuery = "",
  setSearchQuery = () => {},
  subjectFilter = "",
  setSubjectFilter = () => {},
  authorFilter = "",
  setAuthorFilter = () => {},
  sortMostViewed = false,
  setSortMostViewed = () => {},
}) => {
  // Ambil semua subject unik
  const subjects = useMemo(() => {
    const allSubjects = BooksData.flatMap((b) => b.subject || []);
    return [...new Set(allSubjects)].map((s) => ({
      value: s,
      label: s,
    }));
  }, []);

  // Ambil semua author unik
  const authors = useMemo(() => {
    const allAuthors = BooksData.flatMap((b) =>
      Array.isArray(b.author) ? b.author : [b.author]
    ).filter(Boolean);
    return [...new Set(allAuthors)].map((a) => ({
      value: a,
      label: a,
    }));
  }, []);

  // Custom style untuk react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--background_button)", // ubah bg doang
      border: "none",
      boxShadow: "none",
      borderRadius: "0.5rem",
      minHeight: "auto", // biar ikut isi aja
      height: "2.25rem", // sesuaikan sama tinggi btn-default
    }),
    // isi dropdown
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--background_button)",
      borderRadius: "0.5rem",
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255,255,255,0.15)"
        : "transparent",
      color: "var(--color_text_button)",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--color_text_button)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--color_text_button)",
    }),
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-6 p-4">
      {/* Search */}
      <div className="w-full md:w-1/3">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex w-full flex-col md:flex-row md:w-2/3 md:justify-end items-center gap-4">
        {/* Subject Dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            options={subjects}
            value={
              subjectFilter
                ? { value: subjectFilter, label: subjectFilter }
                : null
            }
            onChange={(selected) => setSubjectFilter(selected?.value || "")}
            placeholder="Pilih Subjek..."
            styles={customStyles}
            isClearable
          />
        </div>

        {/* Author Dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            options={authors}
            value={
              authorFilter ? { value: authorFilter, label: authorFilter } : null
            }
            onChange={(selected) => setAuthorFilter(selected?.value || "")}
            placeholder="Pilih Penulis..."
            styles={customStyles}
            isClearable
          />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => setSortMostViewed(!sortMostViewed)}
          className="flex w-full md:w-auto items-center text-button py-2 px-4 bg-[var(--background_button)] rounded-lg gap-2"
        >
          <i className={sortMostViewed ? "ri-time-line" : "ri-star-line"} />
          <span>{sortMostViewed ? "Terbaru" : "Populer"}</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
