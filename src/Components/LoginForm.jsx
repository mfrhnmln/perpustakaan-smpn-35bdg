import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "password") {
        const authData = { loggedIn: true, role: "admin", username };
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);

        setLoading(false);

        toast.success("Login sebagai Admin", {
          onClose: () => navigate("/admin/dashboard"),
        });
      } else if (username === "user" && password === "password") {
        const authData = { loggedIn: true, role: "user", username };
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);

        setLoading(false);

        toast.success("Login sebagai User", {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error("Username atau password salah!");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-center px-5 py-20 gap-5 bg-[var(--background_component)] w-full max-w-sm"
    >
      <h1 className="text-title font-bold text-center">Selamat Datang</h1>
      <p className="text-paragraph text-center">
        Login ke Perpustakaan SMP Negeri 35 Bandung
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
      <div className="text-paragraph relative w-full">
        <input
        id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
        </button>
      </div>

      {/* Lupa password */}
      <div className="flex w-full justify-between items-center text-helper relative">
        <Link
          to="/forgot-password"
          className="cursor-pointer hover:underline hover:text-[var(--color_info)]"
        >
          Lupa password?
        </Link>

        {/* Tooltip Info */}
        <div className="relative group">
          <i
            className="ri-information-2-fill text-subtitle cursor-pointer"
            style={{ color: "var(--color_info)" }}
          ></i>

          {/* Box Tooltip */}
          <div className="absolute right-0 mt-2 w-56 p-3 rounded-lg bg-[var(--background_component)] shadow-lg text-paragraph text-sm opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <p className="font-semibold">Login sebagai User</p>
            <p>
              Username: <span className="font-mono">user</span>
            </p>
            <p>
              Password: <span className="font-mono">password</span>
            </p>
          </div>
        </div>
      </div>

      {/* Button Login */}
      <button
        type="submit"
        disabled={loading}
        className="btn-default mt-3 disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Login"}
      </button>

      <p className="text-helper text-center mt-4">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-bold hover:underline hover:text-[var(--color_info)]"
        >
          Register sekarang
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
