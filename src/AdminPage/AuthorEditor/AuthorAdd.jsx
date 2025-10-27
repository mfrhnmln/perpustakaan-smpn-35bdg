import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDisableBodyScroll } from "../../Service/useDisableBodyScroll";

// Validasi input yang harus diisi
const validateRequiredFields = (form) => {
  const errors = {};
  const nameErrors = [];

  const trimmedName = form.name.trim();
  if (!trimmedName) {
    nameErrors.push("Nama penulis wajib diisi");
  }

  if (nameErrors.length > 0) {
    errors.name = nameErrors;
  }

  return errors;
};

// Komponen input field reusable
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}) => (
  <div className="py-2">
    <p className="text-subtitle">{label}</p>
    <input
      autoComplete={autoComplete}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`text-paragraph w-full my-2 p-2 border rounded ${
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

// Komponen utama
const AuthorAdd = ({ isOpen, onClose, onSuccess, authors = [] }) => {
  const [form, setForm] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "" });
      setErrors({});
      setLoading(false);
    }
  }, [isOpen]);

  // Tutup modal dengan Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Matikan scroll body saat modal terbuka
  useDisableBodyScroll(isOpen);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRequiredFields(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cek duplikat
    const isDuplicate = authors.some(
      (a) => a.trim().toLowerCase() === form.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Penulis ini sudah ada");
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      // ⬇Simulasi tambah data
      toast.success(`Penulis "${form.name}" berhasil ditambahkan`);
      onSuccess(form.name.trim());
    } catch (err) {
      console.error("Gagal menambahkan penulis:", err);
      toast.error("Gagal menambahkan penulis");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl p-6 rounded shadow-lg bg-[var(--background_component)]"
      >
        <h1 className="text-title font-bold mb-6">Tambah Penulis Baru</h1>

        <InputField
          label="Nama Penulis/Penerbit"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Contoh: Tere Liye"
          error={errors.name}
          autoComplete="off"
        />

        <div className="flex justify-end gap-2 mt-10">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-cancel"
          >
            Batal
          </button>
          <button type="submit" disabled={loading} className="btn-save">
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorAdd;
