import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingOverlay from "../../Function/LoadingOverlay";

// Komponen internal
import AuthorAdd from "./AuthorAdd";
import AuthorTable from "./AuthorTable";
import AuthorFilter from "./AuthorFilter";

// Data buku
import BooksData from "../../Data/BooksData";

const AuthorEditor = () => {
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil data author dari BooksData (bukan API)
  const fetchAuthors = async () => {
    setLoading(true);
    try {
      // Ambil semua author → flatten biar support array atau string
      const allAuthors = BooksData.flatMap((book) =>
        Array.isArray(book.author) ? book.author : [book.author]
      ).filter(Boolean);

      // Ambil unique author (string)
      const uniqueAuthors = [...new Set(allAuthors)];

      setAuthors(uniqueAuthors);
    } catch (err) {
      console.error("Gagal memuat data author", err);
      toast.error("Gagal memuat data penulis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Filter berdasarkan search
  const filteredAuthors = authors.filter((a) => {
    const search = searchQuery.toLowerCase();
    return a.toLowerCase().includes(search);
  });

  return (
    <div className="relative bg-[var(--background_component)]">
      <LoadingOverlay show={loading} message="Memuat data penulis..." />

      {/* Judul */}
      <div className="flex justify-between px-5 py-10 text-left border-b border-[var(--color_text_title)]/30">
        <h1 className="text-title font-bold">Manajemen Penulis</h1>

        <button onClick={() => setShowAddModal(true)} className="btn-default">
          Tambah Penulis
        </button>
      </div>

      <div className="px-5">
        {/* Modal tambah */}
        <AuthorAdd
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchAuthors();
            setShowAddModal(false);
          }}
          authors={authors}
        />

        {/* Filter */}
        <AuthorFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalAuthors={filteredAuthors.length}
        />

        {/* Tabel */}
        <AuthorTable authors={filteredAuthors} fetchAuthors={fetchAuthors} />
      </div>
    </div>
  );
};

export default AuthorEditor;
