import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BookData } from "../../Service/BookData";

const BookEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Ambil semua data & handler dari BookData hook
  const { books, loading, handleUpdate } = BookData();

  // State form
  const [form, setForm] = useState(null);

  // Update state form saat books sudah load
  useEffect(() => {
    if (!loading) {
      const book = books.find((b) => b.slug === slug);
      if (book) {
        setForm(book);
      } else {
        setForm(null); // tidak ditemukan
      }
    }
  }, [books, slug, loading]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form) return;

    handleUpdate(form.id, form); // update state global
    toast.success("Data buku berhasil disimpan!"); // notifikasi toast
    setTimeout(() => {
      navigate("/admin/buku"); // redirect setelah notifikasi
    }, 1500);
  };

  if (loading) return <div>Loading data buku...</div>;
  if (!form) return <div>Buku tidak ditemukan</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full justify-center gap-2 p-5 rounded-lg shadow text-paragraph"
    >
      <div className="grid grid-cols-2 gap-5">
        {/* Kiri */}
        <div className="flex flex-col gap-2">
          {/* Judul */}
          <div>
            <label
              htmlFor="title"
              className="text-subtitle font-bold block mb-1"
            >
              Judul Buku
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Penulis */}
          <div>
            <label
              htmlFor="author"
              className="text-subtitle font-bold block mb-1"
            >
              Penulis:
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={
                Array.isArray(form.author)
                  ? form.author.join(", ")
                  : form.author
              }
              onChange={(e) =>
                handleChange(
                  "author",
                  e.target.value.split(",").map((a) => a.trim())
                )
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Penerbit */}
          <div>
            <label
              htmlFor="publisher"
              className="text-subtitle font-bold block mb-1"
            >
              Penerbit
            </label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              value={form.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Subjek */}
          <div>
            <label
              htmlFor="subjects"
              className="text-subtitle font-bold block mb-1"
            >
              Subjek
            </label>
            <input
              id="subjects"
              name="subjects"
              type="text"
              value={
                Array.isArray(form.subject)
                  ? form.subject.join(", ")
                  : form.subject
              }
              onChange={(e) =>
                handleChange(
                  "subject",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* klasifikasi */}
          <div>
            <label
              htmlFor="classification"
              className="text-subtitle font-bold block mb-1"
            >
              Klasifikasi
            </label>
            <input
              id="classification"
              name="classification"
              type="text"
              value={form.classification}
              onChange={(e) => handleChange("classification", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Edisi */}
          <div>
            <label
              htmlFor="edition"
              className="text-subtitle font-bold block mb-1"
            >
              Edisi / Cetakan
            </label>
            <input
              id="edition"
              name="edition"
              type="text"
              value={form.edition}
              onChange={(e) => handleChange("edition", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Volume */}
          <div>
            <label
              htmlFor="volume"
              className="text-subtitle font-bold block mb-1"
            >
              Volume / Jilid
            </label>
            <input
              id="volume"
              name="volume"
              type="text"
              value={form.volume}
              onChange={(e) => handleChange("volume", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* ISBN */}
          <div>
            <label
              htmlFor="isbn"
              className="text-subtitle font-bold block mb-1"
            >
              ISBN:
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              value={form.isbn}
              onChange={(e) => handleChange("isbn", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Judul Seri */}
          <div>
            <label
              htmlFor="series_title"
              className="text-subtitle font-bold block mb-1"
            >
              Judul Seri
            </label>
            <input
              id="series_title"
              name="series_title"
              type="text"
              value={form.series_title}
              onChange={(e) => handleChange("series_title", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Nomor Panggil */}
          <div>
            <label
              htmlFor="call_number"
              className="text-subtitle font-bold block mb-1"
            >
              Nomor Panggil (DDC)
            </label>
            <input
              id="call_number"
              name="call_number"
              type="text"
              value={form.call_number}
              onChange={(e) => handleChange("call_number", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Bahasa isi buku */}
          <div>
            <label
              htmlFor="content_language"
              className="text-subtitle font-bold block mb-1"
            >
              Bahasa Isi
            </label>
            <input
              id="content_language"
              name="content_language"
              type="text"
              value={form.content_language}
              onChange={(e) => handleChange("content_language", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Format */}
          <div>
            <label
              htmlFor="book_format"
              className="text-subtitle font-bold block mb-1"
            >
              Format:
            </label>
            <input
              id="book_format"
              name="book_format"
              type="text"
              value={form.book_format}
              onChange={(e) => handleChange("book_format", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Tahun Terbit */}
          <div>
            <label
              htmlFor="publication_year"
              className="text-subtitle font-bold block mb-1"
            >
              Tahun Terbit
            </label>
            <input
              id="publication_year"
              name="publication_year"
              type="number"
              value={form.publication_year}
              onChange={(e) => handleChange("publication_year", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Kota Terbit */}
          <div>
            <label
              htmlFor="publication_year"
              className="text-subtitle font-bold block mb-1"
            >
              Kota Terbit
            </label>
            <input
              id="publication_place"
              name="publication_place"
              type="text"
              value={form.publication_place}
              onChange={(e) =>
                handleChange("publication_place", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Deskripsi Fisik */}
          <div>
            <label
              htmlFor="physical_description"
              className="text-subtitle font-bold block mb-1"
            >
              Deskripsi Fisik
            </label>
            <input
              id="physical_description"
              name="physical_description"
              type="text"
              value={form.physical_description}
              onChange={(e) =>
                handleChange("physical_description", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Kondisi Buku */}
          <div>
            <label
              htmlFor="book_condition"
              className="text-subtitle font-bold block mb-1"
            >
              Kondisi:
            </label>
            <input
              id="book_condition"
              name="book_condition"
              type="text"
              value={form.book_condition}
              onChange={(e) => handleChange("book_condition", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Lokasi Rak */}
          <div>
            <label
              htmlFor="storage_location"
              className="text-subtitle font-bold block mb-1"
            >
              Lokasi Penyimpanan
            </label>
            <input
              id="storage_location"
              name="storage_location"
              type="text"
              value={form.storage_location}
              onChange={(e) => handleChange("storage_location", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Stok */}
          <div>
            <label
              htmlFor="stock"
              className="text-subtitle font-bold block mb-1"
            >
              Total Stok Buku
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Stok Tersedia */}
          <div>
            <label
              htmlFor="availability_stock"
              className="text-subtitle font-bold block mb-1"
            >
              Stok yang Bisa Dipinjam
            </label>
            <input
              id="availability_stock"
              name="availability_stock"
              type="number"
              value={form.availability_stock}
              onChange={(e) =>
                handleChange("availability_stock", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Abstrak */}
      <div>
        <label htmlFor="Abstrak" className="text-subtitle font-bold block mb-1">
          Ringkasan / Abstrak Buku
        </label>
        <textarea
          id="Abstrak"
          name="Abstrak"
          value={form.abstract}
          onChange={(e) => handleChange("abstract", e.target.value)}
          className="w-full p-2 border rounded-md"
          rows={4}
        />
      </div>

      {/* Tombnol */}
      <div className="flex justify-end gap-4 mt-10">
        {/* tombol batal */}
        <button
          type="button"
          onClick={() => navigate("/admin/buku")}
          className="btn-cancel"
        >
          <i className="ri-close-line mr-1" /> Batal
        </button>

        {/* tombol simpan */}
        <button type="submit" className="btn-save">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default BookEdit;
