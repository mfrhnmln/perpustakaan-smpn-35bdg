import { useState, useMemo, useRef } from "react";
import BooksData from "../../Data/BooksData";

const Sidebar = ({
  searchQuery,
  setSearchQuery,
  subjectFilter,
  setSubjectFilter,
  authorFilter,
  setAuthorFilter,
  classificationFilter,
  setClassificationFilter,
  languageFilter,
  setLanguageFilter,
  onlyAvailable,
  setOnlyAvailable,
}) => {
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [showAllClassifications, setShowAllClassifications] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const [openSections, setOpenSections] = useState({
    available: true,
    classification: true,
    subject: true,
    author: true,
    language: true,
  });

  const inputRef = useRef(null);
  const handleIconClick = () => inputRef.current?.focus();

  // ✅ Subject unik
  const subjects = useMemo(() => {
    const allSubjects = BooksData.flatMap((b) => b.subject || []);
    return [...new Set(allSubjects)];
  }, []);

  // ✅ Author unik
  const authors = useMemo(() => {
    const allAuthors = BooksData.flatMap((b) =>
      Array.isArray(b.author) ? b.author : [b.author]
    ).filter(Boolean);
    return [...new Set(allAuthors)];
  }, []);

  // ✅ Classification unik
  const classifications = useMemo(() => {
    return [
      ...new Set(BooksData.map((b) => b.classification).filter(Boolean)),
    ].sort((a, b) => parseFloat(a) - parseFloat(b));
  }, []);

  // ✅ Language unik dari data
  const languages = useMemo(() => {
    return [
      ...new Set(BooksData.map((b) => b.content_language).filter(Boolean)),
    ];
  }, []);

  // 🔽 toggle buka/tutup section
  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="flex flex-col w-full md:w-60 lg:w-full p-4 gap-4">
      {/* Search */}
      <div className="pb-4 border-b border-[var(--color_text_title)]/30">
        <label htmlFor="search" className="block text-subtitle font-bold mb-2">
          Cari Buku
        </label>
        <div className="flex w-full items-center gap-2 px-3 py-2 border border-[var(--background_button)] rounded-md text-paragraph text-[var(--color_text_title)]">
          <input
          id="search"
            ref={inputRef}
            type="text"
            placeholder="Cari judul / penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
          <i
            onClick={handleIconClick}
            className="ri-search-2-line cursor-pointer"
          />
        </div>
      </div>

      {/* Tersedia */}
      <div className="pb-4 border-b border-[var(--color_text_title)]/30">
        <button
          onClick={() => toggleSection("available")}
          className="w-full flex justify-between items-center text-subtitle font-bold"
        >
          Tersedia
          <i
            className={`ri-arrow-${
              openSections.available ? "up" : "down"
            }-s-line`}
          />
        </button>
        {openSections.available && (
          <div className="flex items-center gap-2 mt-2 text-paragraph">
            <input
              type="checkbox"
              id="available"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            <label htmlFor="available">
              Tersedia di Rak
            </label>
          </div>
        )}
      </div>

      {/* Klasifikasi */}
      <div className="pb-4 border-b border-[var(--color_text_title)]/30">
        {/* judul + dropdown */}
        <button
          onClick={() => toggleSection("classification")}
          className="w-full flex justify-between items-center text-subtitle font-bold"
        >
          Klasifikasi
          <i
            className={`ri-arrow-${
              openSections.classification ? "up" : "down"
            }-s-line`}
          />
        </button>

        {openSections.classification && (
          <div className="mt-2 flex flex-col gap-2">
            {/* 🔄 Reset filter */}
            <button
              onClick={() => setClassificationFilter(null)} // ⬅ ganti "" jadi null
              className={`text-left px-2 py-1 rounded ${
                !classificationFilter
                  ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                  : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
              }`}
            >
              Semua Klasifikasi
            </button>

            {/* daftar klasifikasi detail */}
            {(showAllClassifications
              ? classifications
              : classifications.slice(0, 4)
            ).map((cls) => (
              <button
                key={cls}
                onClick={() =>
                  setClassificationFilter(
                    classificationFilter === cls ? null : cls
                  )
                }
                className={`text-left px-2 py-1 rounded ${
                  classificationFilter === cls
                    ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                    : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
                }`}
              >
                {cls}
              </button>
            ))}

            {/* toggle lihat semua */}
            {classifications.length > 4 && (
              <button
                onClick={() =>
                  setShowAllClassifications(!showAllClassifications)
                }
                className="text-helper hover:underline"
                style={{ color: "var(--color_info)" }}
              >
                {showAllClassifications
                  ? "Lihat lebih sedikit"
                  : "Lihat lebih banyak"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Subject */}
      <div className="pb-4 border-b border-[var(--color_text_title)]/30">
        <button
          onClick={() => toggleSection("subject")}
          className="w-full flex justify-between items-center text-subtitle font-bold"
        >
          Subjek
          <i
            className={`ri-arrow-${
              openSections.subject ? "up" : "down"
            }-s-line`}
          />
        </button>
        {openSections.subject && (
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={() => setSubjectFilter("")}
              className={`text-left px-2 py-1 rounded ${
                subjectFilter === ""
                  ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                  : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
              }`}
            >
              Semua Subjek
            </button>
            {(showAllSubjects ? subjects : subjects.slice(0, 4)).map((s) => (
              <button
                key={s}
                onClick={() => setSubjectFilter(subjectFilter === s ? "" : s)}
                className={`text-left px-2 py-1 rounded ${
                  subjectFilter === s
                    ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                    : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
                }`}
              >
                {s}
              </button>
            ))}
            {subjects.length > 4 && (
              <button
                onClick={() => setShowAllSubjects(!showAllSubjects)}
                className="text-helper hover:underline"
                style={{ color: "var(--color_info)" }}
              >
                {showAllSubjects ? "Lihat lebih sedikit" : "Lihat lebih banyak"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Author */}
      <div className="pb-4 border-b border-[var(--color_text_title)]/30">
        <button
          onClick={() => toggleSection("author")}
          className="w-full flex justify-between items-center text-subtitle font-bold"
        >
          Penulis
          <i
            className={`ri-arrow-${openSections.author ? "up" : "down"}-s-line`}
          />
        </button>
        {openSections.author && (
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={() => setAuthorFilter("")}
              className={`text-left px-2 py-1 rounded ${
                authorFilter === ""
                  ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                  : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
              }`}
            >
              Semua Penulis
            </button>
            {(showAllAuthors ? authors : authors.slice(0, 4)).map((a) => (
              <button
                key={a}
                onClick={() => setAuthorFilter(authorFilter === a ? "" : a)}
                className={`text-left px-2 py-1 rounded ${
                  authorFilter === a
                    ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                    : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
                }`}
              >
                {a}
              </button>
            ))}
            {authors.length > 4 && (
              <button
                onClick={() => setShowAllAuthors(!showAllAuthors)}
                className="text-helper hover:underline"
                style={{ color: "var(--color_info)" }}
              >
                {showAllAuthors ? "Lihat lebih sedikit" : "Lihat lebih banyak"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bahasa */}
      <div className="pb-4 border-b border-[var(--color_text_title)]/30">
        <button
          onClick={() => toggleSection("language")}
          className="w-full flex justify-between items-center text-subtitle font-bold"
        >
          Bahasa
          <i
            className={`ri-arrow-${
              openSections.language ? "up" : "down"
            }-s-line`}
          />
        </button>
        {openSections.language && (
          <div className="mt-2 flex flex-col gap-2">
            <button
              onClick={() => setLanguageFilter("")}
              className={`text-left px-2 py-1 rounded ${
                languageFilter === ""
                  ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                  : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
              }`}
            >
              Semua Bahasa
            </button>
            {(showAllLanguages ? languages : languages.slice(0, 4)).map(
              (lang) => (
                <button
                  key={lang}
                  onClick={() =>
                    setLanguageFilter(languageFilter === lang ? "" : lang)
                  }
                  className={`text-left px-2 py-1 rounded ${
                    languageFilter === lang
                      ? "bg-[var(--background_button)] text-paragraph text-[var(--color_text_button)]"
                      : "hover:bg-[var(--background_sidebar)] text-paragraph hover:text-[var(--color_text_button)]"
                  }`}
                >
                  {lang}
                </button>
              )
            )}
            {languages.length > 4 && (
              <button
                onClick={() => setShowAllLanguages(!showAllLanguages)}
                className="text-helper hover:underline"
                style={{ color: "var(--color_info)" }}
              >
                {showAllLanguages
                  ? "Lihat lebih sedikit"
                  : "Lihat lebih banyak"}
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
