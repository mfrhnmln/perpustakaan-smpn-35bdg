import Select from "react-select";

const FilterDataBook = ({
  searchQuery,
  setSearchQuery,
  subjectFilter,
  setSubjectFilter,
  authorFilter,
  setAuthorFilter,
  subjects = [],
  authors = [],
  totalBooks,
}) => {
  // Konversi data subject ke format react-select
  const subjectOptions = [
    { value: "", label: "Semua Subject" },
    ...subjects.map((s) => ({ value: s.name, label: s.name })),
  ];

  // Konversi data author ke format react-select
  const authorOptions = [
    { value: "", label: "Semua Penulis" },
    ...authors.map((a) => ({ value: a.name, label: a.name })),
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 py-5">
      {/* Input pencarian judul buku */}
      <div className="flex w-full items-center gap-2 px-3 py-2 border rounded-sm border-[var(--background_button)] text-[var(--color_text_title)]">
        <input
          name="search"
          type="text"
          placeholder="Cari judul buku..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
        <i className="ri-search-2-line cursor-pointer" />
      </div>

      {/* Filter Subject */}
      <div className="w-full">
        <Select
          options={subjectOptions}
          value={subjectOptions.find((opt) => opt.value === subjectFilter)}
          onChange={(opt) => setSubjectFilter(opt.value)}
          className="text-paragraph"
          classNamePrefix="react-select"
          isSearchable
        />
      </div>

      {/* Filter Penulis */}
      <div className="w-full">
        <Select
          options={authorOptions}
          value={authorOptions.find((opt) => opt.value === authorFilter)}
          onChange={(opt) => setAuthorFilter(opt.value)}
          className="text-paragraph"
          classNamePrefix="react-select"
          isSearchable
        />
      </div>

      {/* Total data */}
      <p className="text-paragraph w-full ml-auto text-right lg:max-w-32">
        Total: <span className="text-subtitle font-bold">{totalBooks}</span>{" "}
        buku
      </p>
    </div>
  );
};

export default FilterDataBook;
