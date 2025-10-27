// src/Service/BookData.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchBooks, fetchSubjects, fetchAuthors, addBook } from "./BookService";

export const BookData = () => {
  // State utama
  const [books, setBooks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // State filter & pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  // State sorting
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  /**
   * Fungsi refetch semua data dari server
   */
  const reloadBooks = async () => {
    setLoading(true);
    try {
      const [b, s, a] = await Promise.all([
        fetchBooks(),    // Ambil semua buku
        fetchSubjects(), // Ambil semua subject
        fetchAuthors(),  // Ambil semua penulis
      ]);
      setBooks(b);
      setSubjects(s);
      setAuthors(a);
    } catch (err) {
      toast.error("Gagal memuat data buku");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load data pertama kali
  useEffect(() => {
    reloadBooks();
  }, []);

  /**
   * Tambah buku baru
   */
  const handleAdd = async (newBook, onSuccess) => {
    setLoading(true);
    try {
      const added = await addBook(newBook);
      setBooks((prev) => [...prev, added]);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update buku di state lokal
   */
  const handleUpdate = (id, updated) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updated } : book))
    );
  };

  /**
   * Hapus buku di state lokal
   */
  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  /**
   * Sorting data
   */
  const handleSort = (field, direction) => {
    if (sortBy === field && sortDirection === direction) {
      setSortBy(null);
      setSortDirection("asc");
    } else {
      setSortBy(field);
      setSortDirection(direction);
    }
  };

  /**
   * Filter buku sesuai pencarian, subject, dan author
   */
  const filteredBooks = books.filter((b) => {
    const matchTitle = (b.title?.toLowerCase() ?? "").includes(searchQuery.toLowerCase());
    const matchSubject = subjectFilter ? b.subject?.name === subjectFilter : true;
    const matchAuthor = authorFilter ? b.author?.name === authorFilter : true;
    return matchTitle && matchSubject && matchAuthor;
  });

  /**
   * Urutkan buku
   */
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortBy) return 0;
    const direction = sortDirection === "asc" ? 1 : -1;
    if (sortBy === "no") return direction * (a.id - b.id);
    return 0;
  });

  // Return semua data & handler
  return {
    books: sortedBooks,
    subjects,
    authors,
    loading,

    // Filter
    searchQuery,
    setSearchQuery,
    subjectFilter,
    setSubjectFilter,
    authorFilter,
    setAuthorFilter,

    // Sorting
    sortBy,
    sortDirection,
    handleSort,

    // CRUD
    handleAdd,
    handleUpdate,
    handleDelete,

    // Refetch dari server
    fetchBooks: reloadBooks,
  };
};
