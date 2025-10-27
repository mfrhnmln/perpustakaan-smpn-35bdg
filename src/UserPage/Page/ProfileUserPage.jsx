import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../Function/LoadingOverlay";

const ProfileUserPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  // dummy user
  const user = {
    name: "User",
    phone_number: "081234567890",
  };

  // dummy user
  useEffect(() => {
    // Simulasi fetch data
    const timer = setTimeout(() => {
      setHistory([
        {
          id: 1,
          status: "approved",
          created_at: new Date().toISOString(),
          due_at: new Date(Date.now() + 3 * 86400000).toISOString(),
          returned_at: null,
          book: { title: "One Piece vol.1977" },
        },
        {
          id: 2,
          status: "rejected",
          // created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
          created_at: "8/8/2025", //format mm/dd/yyyy
          due_at: null,
          returned_at: null,
          book: { title: "Detektif Conan Vol.1" },
        },
        {
          id: 3,
          status: "return",
          created_at: "8/2/2025", //format mm/dd/yyyy
          due_at: "8/5/2025", //format mm/dd/yyyy
          returned_at: "8/5/2025", //format mm/dd/yyyy
          book: { title: "One Piece vol.1" },
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filterHistory = (data) => {
    if (showHistory) return data;

    const now = new Date();

    return data.filter((item) => {
      if (item.status === "approved" && !item.returned_at) return true;

      if (item.status === "rejected") {
        const rejectedAt = new Date(item.created_at);
        const diffInDays = (now - rejectedAt) / (1000 * 60 * 60 * 24);
        return diffInDays <= 3;
      }

      return false;
    });
  };

  return (
    <div className="md:p-5">
      <LoadingOverlay show={isLoading} message="Memuat data pengguna..." />
      <div className="relative py-5 max-w-5xl mx-auto shadow rounded bg-[var(--background_component)]">
        {/* Tombol kembali */}
        <div className="px-5">
          <button
            onClick={() => navigate("/")}
            className="btn-default transition"
          >
            <i className="ri-arrow-left-wide-line"></i> Kembali
          </button>
        </div>

        {/* Judul halaman */}
        <div className="pt-10 pb-5 px-5 text-left">
          <h1 className="text-title font-bold">Profil Pengguna</h1>
        </div>

        {/* Data Pengguna */}
        <div className="px-5 py-10 border-y border-[var(--background_button)]">
          <div className="flex items-center gap-6">
            <div className="text-title w-20 h-20 rounded-full flex items-center justify-center font-bold bg-[var(--background_button)]">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col items-start">
              <p className="text-subtitle font-bold">{user.name}</p>
              <p className="text-paragraph">
                No Hp: <strong>{user.phone_number}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Riwayat Peminjaman */}
        <div className="px-5 py-10">
          <div className="flex justify-between mb-10">
            <h2 className="text-subtitle font-bold mb-4">
              Riwayat Peminjaman Saya
            </h2>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="btn-default"
            >
              <i className="ri-history-line"></i>{" "}
              {showHistory ? "Peminjaman Baru" : "Semua History"}
            </button>
          </div>

          {filterHistory(history).length === 0 ? (
            <p className="text-subtitle text-center py-20">
              Belum ada riwayat peminjaman.
            </p>
          ) : (
            filterHistory(history).map((item) => (
              <div
                key={item.id}
                className="mb-4 p-4 border rounded shadow-sm bg-[var(--background)]"
              >
                <p className="text-subtitle">
                  Judul: <strong>{item.book?.title}</strong>
                </p>
                <p className="text-paragraph">
                  Status: <strong>{item.status}</strong>
                </p>
                <p className="text-paragraph">
                  Dipinjam:{" "}
                  <strong>
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </strong>
                </p>
                <p className="text-paragraph">
                  Jatuh Tempo:{" "}
                  <strong>
                    {item.due_at
                      ? new Date(item.due_at).toLocaleDateString("id-ID")
                      : "Belum ditentukan"}
                  </strong>
                </p>
                {item.returned_at && (
                  <p className="text-paragraph">
                    Dikembalikan:{" "}
                    <strong>
                      {new Date(item.returned_at).toLocaleDateString("id-ID")}
                    </strong>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUserPage;
