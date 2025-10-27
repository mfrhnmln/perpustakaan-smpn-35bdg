// src/Service/BookService.js
import { toast } from "react-toastify";
import BooksData from "../Data/BooksData";

// Handler error global
const handleError = (error) => {
  const errorMessage = error.message || "Terjadi kesalahan.";
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

// Ambil semua buku
export const fetchBooks = async () => {
  try {
    return Promise.resolve([...BooksData]); // return copy
  } catch (error) {
    handleError(error);
  }
};

// Tambah buku (dummy)
export const addBook = async (book) => {
  try {
    const newBook = { id: Date.now(), ...book };
    toast.success("Buku berhasil ditambahkan");
    return Promise.resolve(newBook);
  } catch (error) {
    handleError(error);
  }
};

// Update buku (dummy)
export const updateBook = async (id, updatedBook) => {
  try {
    toast.success("Perubahan berhasil disimpan");
    return Promise.resolve({ id, ...updatedBook });
  } catch (error) {
    handleError(error);
  }
};

// Hapus buku (dummy)
export const deleteBook = async (id) => {
  try {
    toast.success("Buku berhasil dihapus");
    return Promise.resolve({ success: true, id });
  } catch (error) {
    handleError(error);
  }
};

// Toggle aktif/nonaktif (dummy)
export const toggleActiveBook = async (id, is_active) => {
  try {
    return Promise.resolve({ id, is_active });
  } catch (error) {
    handleError(error);
  }
};

// Ambil semua subject (dulu genre)
export const fetchSubjects = async () => {
  try {
    const subjects = Array.from(
      new Set(BooksData.flatMap((b) => b.subject || []))
    ).map((name, i) => ({ id: i + 1, name }));
    return Promise.resolve(subjects);
  } catch (error) {
    handleError(error);
  }
};

// Ambil semua penulis
export const fetchAuthors = async () => {
  try {
    const authors = Array.from(
      new Set(BooksData.flatMap((b) => (Array.isArray(b.author) ? b.author : [b.author])))
    ).map((name, i) => ({ id: i + 1, name }));
    return Promise.resolve(authors);
  } catch (error) {
    handleError(error);
  }
};

// Ambil buku berdasarkan slug
export const fetchBookBySlug = async (slug) => {
  try {
    const book = BooksData.find((b) => b.slug === slug);
    if (!book) throw new Error("Buku tidak ditemukan");
    return Promise.resolve(book);
  } catch (error) {
    handleError(error);
  }
};

// Tambah view (dummy, bertambah)
export const incrementView = async (id) => {
  try {
    const book = BooksData.find((b) => b.id === id);
    if (!book) throw new Error("Buku tidak ditemukan");
    book.view = Number(book.view || 0) + 1;
    return Promise.resolve(book);
  } catch (error) {
    handleError(error);
  }
};

// Tambah like (dummy, bertambah)
export const likeBook = async (id) => {
  try {
    const book = BooksData.find((b) => b.id === id);
    if (!book) throw new Error("Buku tidak ditemukan");
    book.like = Number(book.like || 0) + 1;
    return Promise.resolve(book);
  } catch (error) {
    handleError(error);
  }
};
