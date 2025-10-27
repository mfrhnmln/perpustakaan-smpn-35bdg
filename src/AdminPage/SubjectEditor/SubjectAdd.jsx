import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDisableBodyScroll } from "../../Service/useDisableBodyScroll";

// Validasi input yang harus diisi
const validateRequiredFields = (form) => {
  const errors = {};
  if (!form.name?.trim()) {
    errors.name = ["Subject wajib diisi"];
  }
  return errors;
};

// Komponen input field reusable dengan autocomplete
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
    <label className="text-subtitle">
      {label}
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`text-paragraph w-full my-2 p-2 border rounded ${
          error
            ? "border-[var(--color_error)]"
            : "border-[var(--color_text_paragraph)]"
        }`}
      />
    </label>
    {error && (
      <small className="text-[var(--color_error)]">
        {Array.isArray(error) ? error.join(", ") : error}
      </small>
    )}
  </div>
);

const SubjectAdd = ({ isOpen, onClose, onSuccess, subjects = [] }) => {
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

  // Tutup modal pakai ESC
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRequiredFields(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cek duplikasi berdasarkan nama
    const isDuplicate = subjects.some(
      (s) => s.trim().toLowerCase() === form.name.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Subject ini sudah ada");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const newSubject = {
        id: Date.now(),
        name: form.name.trim(),
      };

      onSuccess(newSubject);
      toast.success(`Subject "${form.name}" berhasil ditambahkan (dummy).`);
    } catch (err) {
      console.error("Error saat menambahkan subject:", err);
      toast.error("Gagal menambahkan subject");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl p-6 rounded shadow-lg bg-[var(--background_component)]"
      >
        <h1 className="text-title font-bold mb-6">Tambah Subject Baru</h1>

        <InputField
          label="Subject"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Contoh: Pendidikan, Ensiklopedia"
          error={errors.name}
          autoComplete="off"
        />

        <div className="flex justify-end gap-4 mt-10">
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

export default SubjectAdd;
