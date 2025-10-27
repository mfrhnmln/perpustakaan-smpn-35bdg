import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);

  // Dummy user (tanpa database)
  const dummyUser = {
    name: "user",
    phone: "08123456789",
  };

  // Step 1 - verifikasi
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Step 2 - reset password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1 handler
  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (
        name.trim().toLowerCase() === dummyUser.name &&
        phoneNumber === dummyUser.phone
      ) {
        toast.success("Verifikasi berhasil, silakan reset password.");
        setStep(2);
      } else {
        toast.error("Nama atau No Telpon salah!");
      }
      setLoading(false);
    }, 800);
  };

  // Step 2 handler
  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (newPassword.length < 8) {
        toast.error("Password minimal 8 karakter!");
      } else if (newPassword !== confirmPassword) {
        toast.error("Password tidak cocok!");
      } else {
        toast.success("Password berhasil direset. Silakan login.", {
          onClose: () => navigate("/login"), // pindah ke login setelah toast hilang
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <form
        onSubmit={step === 1 ? handleVerify : handleReset}
        className="flex flex-col justify-center px-6 py-12 gap-5 rounded-xl shadow-lg w-full max-w-lg bg-[var(--background_component)]"
      >
        <h1 className="text-title font-bold text-center">Reset Password</h1>
        <p className="text-paragraphe text-center">
          {step === 1
            ? "Masukkan data anda untuk verifikasi."
            : "Atur ulang password baru anda."}
        </p>

        {/* Step 1: Verifikasi */}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <label className="text-subtitle">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_brand)]"
            />

            <label className="text-subtitle">No Telepon</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="No Telp"
              className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_brand)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-default mt-3 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Verifikasi"}
            </button>
          </div>
        )}

        {/* Step 2: Reset Password */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <label className="text-subtitle">Password Baru</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_brand)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-helper"
              >
                <i
                  className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}
                />
              </button>
            </div>

            <label className="text-subtitle">Konfirmasi Password Baru</label>
            <div className="relative w-full">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_brand)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-helper"
              >
                <i
                  className={showConfirm ? "ri-eye-off-line" : "ri-eye-line"}
                />
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-default mt-3 disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Password Baru"}
            </button>
          </div>
        )}

        <p className="text-helper text-center mt-4">
          Kembali ke
          <Link
            to="/login"
            className="font-bold hover:underline hover:text-[var(--color_info)]"
          >
            {" "}
            login{" "}
          </Link>
          ?
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
