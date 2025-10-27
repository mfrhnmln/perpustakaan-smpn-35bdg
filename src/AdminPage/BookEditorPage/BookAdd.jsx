import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { useDisableBodyScroll } from "../../Service/useDisableBodyScroll";

const BookAdd = ({
  isOpen,
  onClose,
  onSubmit,
  authors = [],
  subjects = [],
}) => {
  const [data, setData] = useState({
    title: "",
    author_id: null,
    subject_id: null,
    book_format: null,
    edition: "",
    volume: "",
    series_title: "",
    isbn: "",
    classification: "",
    call_number: "",
    physical_description: "",
    content_language: "",
    publication_year: "",
    publication_place: "",
    chapter: "",
    description: "",
    place: "",
    condition: "",
    is_active: true,
    cover: null,
    pdf: null,
    stock: 0,
    available_stock: 0,
  });

  const [preview, setPreview] = useState({ type: null, url: null });

  useDisableBodyScroll(isOpen);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(data);
      toast.success("Buku berhasil ditambahkan!");
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
        <div className="w-full md:max-w-[80vw] max-h-[90vh] rounded p-6 shadow-lg overflow-y-auto bg-[var(--background_component)]">
          {/* judul halaman */}
          <h1 className="text-title font-semibold mb-4">Tambah Buku Baru</h1>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-5">
              {/* Kiri */}
              <div className="flex flex-col gap-2">
                {/* Judul Buku */}
                <div>
                  <label
                    htmlFor="title"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Judul Buku *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Judul Buku..."
                    value={data.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                  />
                </div>

                {/* Penulis (react-select single) */}
                <div>
                  <label
                    htmlFor="author_id"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Penulis *
                  </label>
                  <Select
                    inputId="author_id"
                    name="author_id"
                    options={authors.map((a) => ({
                      value: a.id,
                      label: a.name,
                    }))}
                    value={
                      data.author_id
                        ? {
                            value: data.author_id,
                            label: authors.find((a) => a.id === data.author_id)
                              ?.name,
                          }
                        : null
                    }
                    onChange={(option) =>
                      handleChange("author_id", option?.value || null)
                    }
                    classNamePrefix="select"
                    placeholder="Cari penulis..."
                    // isClearable
                    // styles={{
                    //   control: (provided) => ({
                    //     ...provided,
                    //     backgroundColor: colors.background_component,
                    //   }),
                    // }}
                  />
                </div>

                {/* Publisher */}
                <div>
                  <label
                    htmlFor="publisher"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Penerbit
                  </label>
                  <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    placeholder="Penerbit Buku..."
                    value={data.publisher}
                    onChange={(e) => handleChange("publisher", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                  />
                </div>

                {/* Subjects */}
                <div>
                  <label
                    htmlFor="subjects"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Subjek
                  </label>
                  <Select
                    inputId="subjects"
                    name="subjects"
                    options={subjects.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    value={
                      data.subject_id
                        ? {
                            value: data.subject_id,
                            label: subjects.find(
                              (s) => s.id === data.subject_id
                            )?.name,
                          }
                        : null
                    }
                    onChange={(option) =>
                      handleChange("subject_id", option?.value || null)
                    }
                    placeholder="Pilih subjek..."
                    //   styles={{
                    //   control: (provided) => ({
                    //     ...provided,
                    //     backgroundColor: colors.background_component,
                    //   }),
                    // }}
                  />
                </div>

                {/* Klasifikasi */}
                {/* <div>
                  <label
                    htmlFor="classification"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Klasifikasi
                  </label>
                  <input
                    id="classification"
                    name="classification"
                    type="text"
                    value={data.classification}
                    onChange={(e) =>
                      handleChange("classification", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: 500"
                  />
                </div> */}

                {/* Edisi */}
                <div>
                  <label
                    htmlFor="edition"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Edisi / Cetakan
                  </label>
                  <input
                    id="edition"
                    name="edition"
                    type="text"
                    value={data.edition}
                    onChange={(e) => handleChange("edition", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: Cetakan ke-1"
                  />
                </div>

                {/* Volume */}
                <div>
                  <label
                    htmlFor="volume"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Volume / Jilid
                  </label>
                  <input
                    id="volume"
                    name="volume"
                    type="text"
                    value={data.volume}
                    onChange={(e) => handleChange("volume", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: Jilid 1 / Vol. 2"
                  />
                </div>

                {/* ISBN */}
                <div>
                  <label
                    htmlFor="isbn"
                    className="text-subtitle block font-medium mb-1"
                  >
                    ISBN
                  </label>
                  <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    value={data.isbn}
                    onChange={(e) => handleChange("isbn", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: 978-602-244-123-4"
                  />
                </div>

                {/* Judul Seri */}
                <div>
                  <label
                    htmlFor="series_title"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Judul Seri
                  </label>
                  <input
                    id="series_title"
                    name="series_title"
                    type="text"
                    value={data.series_title}
                    onChange={(e) =>
                      handleChange("series_title", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="isi jika ada..."
                  />
                </div>

                {/* Nomor Panggil */}
                <div>
                  <label
                    htmlFor="call_number"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Nomor Panggil (DDC)
                  </label>
                  <input
                    id="call_number"
                    name="call_number"
                    type="text"
                    value={data.call_number}
                    onChange={(e) =>
                      handleChange("call_number", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="813 FIK: 813=Sastra, FIK=fiksi"
                  />
                </div>
              </div>

              {/* Kanan */}
              <div className="flex flex-col gap-2">
                {/* Bahasa isi buku */}
                <div>
                  <label
                    htmlFor="content_language"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Bahasa Konten
                  </label>
                  <input
                    id="content_language"
                    name="content_language"
                    type="text"
                    value={data.content_language}
                    onChange={(e) =>
                      handleChange("content_language", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="Indonesia"
                  />
                </div>

                {/* Format */}
                <div>
                  <label
                    htmlFor="book_format"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Format Buku
                  </label>
                  <select
                    id="book_format"
                    name="book_format"
                    value={data.book_format}
                    onChange={(option) =>
                      handleChange("book_format", option?.value || null)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="Pilih Format Buku"
                  >
                    <option value="Buku Cetak">Buku Cetak</option>
                    <option value="E-Book">E-Book</option>
                  </select>
                </div>

                {/* Tahun Terbit */}
                <div>
                  <label
                    htmlFor="publication_year"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Tahun Terbit
                  </label>
                  <input
                    id="publication_year"
                    name="publication_year"
                    type="number"
                    value={data.publication_year}
                    onChange={(e) =>
                      handleChange("publication_year", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: 2025"
                  />
                </div>

                {/* Kota Terbit */}
                <div>
                  <label
                    htmlFor="publication_place"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Tempat Terbit
                  </label>
                  <input
                    id="publication_place"
                    name="publication_place"
                    type="text"
                    value={data.publication_place}
                    onChange={(e) =>
                      handleChange("publication_place", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="Negara/Kota Buku diterbitkan"
                  />
                </div>

                {/* Deskripsi Fisik */}
                <div>
                  <label
                    htmlFor="physical_description"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Deskripsi Fisik
                  </label>
                  <input
                    id="physical_description"
                    name="physical_description"
                    type="text"
                    value={data.physical_description}
                    onChange={(e) =>
                      handleChange("physical_description", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="200 hlm. : ilus. ; 25 cm."
                  />
                </div>

                {/* Kondisi Buku */}
                <div>
                  <label
                    htmlFor="book_condition"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Kondisi Buku
                  </label>
                  <input
                    id="book_condition"
                    name="book_condition"
                    type="text"
                    value={data.condition}
                    onChange={(e) => handleChange("condition", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: Baik/Rusak"
                  />
                </div>

                {/* Lokasi Rak */}
                <div>
                  <label
                    htmlFor="storage_location"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Lokasi Penyimpanan Buku
                  </label>
                  <input
                    id="storage_location"
                    name="storage_location"
                    type="text"
                    value={data.storage_location}
                    onChange={(e) =>
                      handleChange("storage_location", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    placeholder="contoh: Rak A-1"
                  />
                </div>

                {/* Stok */}
                <div>
                  <label
                    htmlFor="stock"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Total Stok Buku
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={data.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    className="text-paragraph w-full p-2 border rounded"
                    min="0"
                  />
                </div>

                {/* Bisa Dipinjam */}
                <div>
                  <label
                    htmlFor="availability_stock"
                    className="text-subtitle block font-medium mb-1"
                  >
                    Stok yang Bisa Dipinjam
                  </label>
                  <input
                    id="availability_stock"
                    name="availability_stock"
                    type="number"
                    value={data.available_stock}
                    onChange={(e) =>
                      handleChange("available_stock", e.target.value)
                    }
                    className="text-paragraph w-full p-2 border rounded"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-subtitle block font-medium mb-1">
                Deskripsi Buku
              </label>
              <textarea
                placeholder="Deskripsi Buku"
                value={data.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="text-paragraph w-full p-2 border rounded"
                rows={4}
              />
            </div>

            {/* Status Buku */}
            <div className="flex justify-end items-center gap-2 p-2">
              <span
                htmlFor="is_active"
                className="text-subtitle block px-2 pb-2"
              >
                Tersedia untuk User
              </span>

              <label className="relative inline-block w-20 h-9 cursor-pointer">
                <input
                  id="is_active"
                  name="is_active"
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={data.is_active}
                  onChange={(e) => handleChange("is_active", e.target.checked)}
                />

                {/* Background toggle */}
                <span
                  className={`absolute w-14 h-7 rounded-full transition-colors duration-300 ${
                    data.is_active
                      ? "bg-[var(--color_success)]"
                      : "bg-[var(--color_error)]"
                  }`}
                ></span>

                {/* Bola toggle */}
                <span
                  className={`absolute top-0 left-0 w-7 h-7 rounded-full transition-transform duration-300 bg-[var(--color_text_title)] ${
                    data.is_active ? "translate-x-7" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>

            {/* Upload file */}
            <div className="flex gap-10">
              {/* Upload Cover */}
              <div className="w-1/2">
                <label className="text-subtitle block font-medium mb-6">
                  Upload Cover Buku
                </label>
                {data.cover && (
                  <img
                    src={URL.createObjectURL(data.cover)}
                    alt="Preview Cover"
                    className="w-40 h-56 object-contain mb-4 cursor-pointer"
                    onClick={() =>
                      setPreview({
                        type: "image",
                        url: URL.createObjectURL(data.cover),
                      })
                    }
                  />
                )}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="cover-upload"
                    className="btn-file cursor-pointer"
                  >
                    Choose File
                  </label>
                  <span className="text-paragraph truncate max-w-md">
                    {data.cover?.name || "No file chosen"}
                  </span>
                </div>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange("cover", e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Upload PDF */}
              <div className="w-1/2">
                <label className="text-subtitle block font-medium mb-6">
                  Upload Buku (PDF)
                </label>
                {data.pdf && (
                  <button
                    onClick={() =>
                      setPreview({
                        type: "pdf",
                        url: URL.createObjectURL(data.pdf),
                      })
                    }
                    className="flex w-full items-center p-4 border rounded mb-4 cursor-pointer bg-[var(--background_cover)]"
                  >
                    <i className="ri-file-pdf-2-line text-header mr-2 bg-[var(--color_error)]"></i>
                    <span className="text-paragraph">{data.pdf.name}</span>
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="pdf-upload"
                    className="btn-file cursor-pointer"
                  >
                    Choose File
                  </label>
                  <span className="text-paragraph truncate max-w-72">
                    {data.pdf?.name || "No file chosen"}
                  </span>
                </div>
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleChange("pdf", e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button onClick={onClose} className="btn-cancel">
              <i className="ri-close-line mr-1" /> Batal
            </button>
            <button onClick={handleSubmit} className="btn-save">
              <i className="ri-save-3-line mr-1" /> Simpan
            </button>
          </div>
        </div>
      </div>

      {preview.url && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[999] bg-[var(--background)]/80"
          onClick={() => setPreview({ type: null, url: null })}
        >
          <div
            className="p-4 rounded overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {preview.type === "image" && (
              <img
                src={preview.url}
                alt="Preview"
                className="max-w-full max-h-[80vh] mx-auto"
              />
            )}
            {preview.type === "pdf" && (
              <iframe
                src={preview.url}
                className="w-[80vh] h-[90vh] shadow-lg overflow-hidden"
                title="PDF Preview"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookAdd;
