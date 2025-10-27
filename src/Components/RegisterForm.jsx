import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (password !== confirmPassword) {
        toast.error("Password tidak cocok!");
      } else {
        const newUser = { username, password, role: "user" };
        localStorage.setItem("registeredUser", JSON.stringify(newUser));
        toast.success("Registrasi berhasil, silakan login.");
        navigate("/login");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col justify-center px-5 py-20 gap-5 bg-[var(--background_component)] w-full max-w-sm"
    >
      <h1 className="text-title font-bold text-center">Register</h1>
      <p className="text-paragraph text-center">
        Buat akun baru untuk masuk ke sistem.
      </p>

      {/* Username */}
      <input
      id="username-name"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_info)]"
      />

      {/* Password */}
      <div className="relative w-full">
        <input
        id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_info)]"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-helper"
        >
          <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative w-full">
        <input
        id="confirm-password"
          type={showConfirm ? "text" : "password"}
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-paragraph w-full border p-2 rounded focus:outline-none focus:ring focus:ring-[var(--color_info)]"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-helper"
        >
          <i className={showConfirm ? "ri-eye-off-line" : "ri-eye-line"} />
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-default mt-3 disabled:opacity-50"
      >
        {loading ? "Mendaftarkan..." : "Register"}
      </button>

      <p className="text-helper text-center mt-4">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-bold hover:underline hover:text-[var(--color_info)]"
        >
          Login sekarang
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
