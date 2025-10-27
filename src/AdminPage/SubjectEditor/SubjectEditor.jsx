import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingOverlay from "../../Function/LoadingOverlay";

// Komponen internal
import SubjectAdd from "./SubjectAdd";
import SubjectTable from "./SubjectTable";
import SubjectFilter from "./SubjectFilter";

// Data buku
import BooksData from "../../Data/BooksData";

const SubjectEditor = () => {
  // State manajemen & filter data subject
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil data subject dari BooksData (bukan API)
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      // Ambil semua subject dari BooksData
      const allSubjects = BooksData.flatMap((book) =>
        Array.isArray(book.subject) ? book.subject : [book.subject]
      ).filter(Boolean);

      // Ambil unique subject (string)
      const uniqueSubjects = [...new Set(allSubjects)];

      setSubjects(uniqueSubjects);
    } catch (err) {
      console.error("Gagal memuat data subject", err);
      toast.error("Gagal memuat data subject");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat pertama kali render
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Filter data subject berdasarkan pencarian
  const filteredSubjects = subjects.filter((s) => {
    const search = searchQuery.toLowerCase();
    return s.toLowerCase().includes(search);
  });

  return (
    <div className="relative bg-[var(--background_component)]">
      {/* Overlay loading saat data dimuat */}
      <LoadingOverlay show={loading} message="Memuat data subjek..." />

      {/* Judul Halaman */}
      <div className="flex justify-between px-5 py-10 text-left border-b border-[var(--color_text_title)]/30">
        <h1 className="text-title font-bold">Manajemen Subject</h1>

        <button onClick={() => setShowAddModal(true)} className="btn-default">
          Tambah Subject
        </button>
      </div>

      {/* Tombol tambah Subject */}
      <div className="px-5">
        {/* Modal tambah subject */}
        <SubjectAdd
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchSubjects();
            setShowAddModal(false);
          }}
          subjects={subjects}
        />

        {/* Filter pencarian */}
        <SubjectFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalSubjects={filteredSubjects.length}
        />

        {/* Tabel daftar Subject */}
        <SubjectTable
          subjects={filteredSubjects}
          fetchSubjects={fetchSubjects}
        />
      </div>
    </div>
  );
};

export default SubjectEditor;
