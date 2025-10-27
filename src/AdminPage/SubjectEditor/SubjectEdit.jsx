import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDisableBodyScroll } from "../../Service/useDisableBodyScroll";

// Validasi input yang harus diisi
const validate = (newSubject) => {
  const newErrors = {};
  if (!newSubject.trim())
    newErrors.newSubject = ["Nama subject tidak boleh kosong"];
  return newErrors;
};

// Komponen reusable untuk input field
const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  readonly = false,
  autoComplete,
}) => (
  <div className="text-paragraph py-2">
    <p>{label}</p>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readonly}
      autoComplete={autoComplete}
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

const SubjectEdit = ({ isOpen, onClose, subject, fetchSubjects }) => {
  const [form, setForm] = useState({ oldSubject: "", newSubject: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form saat modal dibuka
  useEffect(() => {
    if (isOpen && subject) {
      setForm({
        oldSubject: subject || "",
        newSubject: subject || "", // default sama dengan subject lama
      });
      setErrors({});
      setLoading(false);
    }
  }, [isOpen, subject]);

  // Tutup modal dengan ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Disable scroll body saat modal terbuka
  useDisableBodyScroll(isOpen);

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

  // Submit data dummy
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(form.newSubject);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      toast.success("Subject berhasil diperbarui (dummy)");
      fetchSubjects(); // refresh list
      onClose();
    } catch (err) {
      console.error("Gagal update subject:", err);
      toast.error("Gagal memperbarui subject");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--background)]/80">
      <div className="relative w-full max-w-xl p-6 rounded shadow-lg bg-[var(--background_component)]">
        {/* Judul Modal */}
        <h1 className="text-title mb-6">Edit Subject</h1>

        <div className="grid grid-cols-2 gap-6">
          {/* Data Lama */}
          <div>
            <h2 className="text-subtitle font-semibold mb-2">
              Data Sebelumnya
            </h2>
            <InputField
              name="oldSubject"
              label="Subject Lama"
              value={form.oldSubject}
              readonly={true}
              autoComplete="off"
            />
          </div>

          {/* Data Baru */}
          <div>
            <h2 className="text-subtitle font-semibold mb-2">Data Baru</h2>
            <InputField
              name="newSubject"
              label="Nama Subject Baru"
              value={form.newSubject}
              onChange={handleChange}
              error={errors.newSubject}
              placeholder="Masukkan nama subject baru"
              autoComplete="off"
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

export default SubjectEdit;
