import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Validasi sederhana
const validate = (newAuthor) => {
  const errors = {};
  if (!newAuthor.trim()) errors.newAuthor = "Nama penulis tidak boleh kosong";
  return errors;
};

// Reusable InputField
const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  readonly = false,
}) => (
  <div className="text-paragraph py-2">
    <p>{label}</p>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readonly}
      className={`w-full my-2 p-2 border rounded ${
        error
          ? "border-[var(--color_error)]"
          : "border-[var(--color_text_paragraph)]"
      }`}
    />
    {error && (
      <small className="text-[var(--color_error)]">
        {Array.isArray(error) ? error.join(", ") : error}
      </small>
    )}
  </div>
);

const AuthorEdit = ({ isOpen, onClose, author, fetchAuthors }) => {
  const [form, setForm] = useState({ oldAuthor: "", newAuthor: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setForm({
        oldAuthor: author || "",
        newAuthor: author || "", // default isi sama dengan author lama
      });
      setErrors({});
      setLoading(false);
    }
  }, [isOpen, author]);

  // Tutup modal dengan Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  // Submit update (local only, no API)
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(form.newAuthor);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // simulasi update lokal
      toast.success("Penulis berhasil diperbarui (dummy)");
      fetchAuthors(); // refresh list
      onClose();
    } catch (err) {
      console.error("Gagal update penulis:", err);
      toast.error("Gagal memperbarui penulis");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
      <div className="relative w-full max-w-xl p-6 rounded shadow-lg bg-[var(--background_component)]">
        {/* Judul Modal */}
        <h1 className="text-title font-bold mb-6">Edit Penulis</h1>

        <div className="grid grid-cols-2 gap-6">
          {/* Data Lama */}
          <div>
            <h2 className="text-subtitle font-semibold mb-4">Data Sebelumnya</h2>
            <InputField
              name="oldAuthor"
              label="Nama Penulis Lama"
              value={form.oldAuthor}
              readonly={true}
            />
          </div>

          {/* Data Baru */}
          <div>
            <h2 className="text-subtitle font-semibold mb-4">Data Baru</h2>
            <InputField
              name="newAuthor"
              label="Nama Penulis Baru"
              value={form.newAuthor}
              onChange={handleChange}
              error={errors.newAuthor}
              placeholder="Masukkan nama penulis baru"
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-10">
          <button onClick={onClose} disabled={loading} className="btn-cancel">
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-save"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorEdit;
