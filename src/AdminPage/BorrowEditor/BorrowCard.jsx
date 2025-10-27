import { toast } from "react-toastify";

const BorrowCard = ({ req, dueDate, setDueDate, onApprove, onReject }) => {
  // Fungsi handle klik tombol "Izinkan"
  const handleApprove = () => {
    if (!dueDate) {
      toast.error("Mohon isi tanggal pengembalian terlebih dahulu.");
      return;
    }

    if (req.book?.available_stock === 0) {
      toast.error("Stok buku habis. Tidak dapat menyetujui peminjaman.");
      return;
    }

    onApprove();
  };

  const formatDate = (date) =>
    date
      ? new Intl.DateTimeFormat("id-ID", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(date))
      : "-";

  const user = req.user; // sudah join di getBorrowWithUser

  return (
    <div className="border border-[var(--color_text_title)]/30 p-4 rounded-lg my-5 shadow">
      <div className="flex flex-col md:flex-row items-start gap-6 my-5">
        {/* Gambar buku */}
        <img
          src={req.book?.cover}
          alt={req.book?.title}
          className="w-40 h-56 md:w-60 md:h-80 object-contain rounded-md"
        />

        {/* Informasi peminjam & buku */}
        <div className="text-paragraph flex flex-col gap-2 w-full">
          {/* Info siswa/peminjam */}
          <p className="text-subtitle">
            Nama: <strong>{user?.name || req.nama || "-"}</strong>
          </p>
          <p>
            Kelas: <strong>{user?.kelas || req.kelas || "-"}</strong>
          </p>

          {/* Info buku */}
          <p className="text-subtitle font-semibold">{req.book?.title}</p>
          <p>
            Penulis:{" "}
            <strong>{req.book?.author?.name || req.book?.author || "-"}</strong>
          </p>
          <p>
            Chapter / Volume: <strong>{req.book?.volume ?? "-"}</strong>
          </p>
          <p>
            Tahun Rilis: <strong>{req.book?.publication_year ?? "-"}</strong>
          </p>
          <p>
            Kondisi Buku: <strong>{req.book?.book_condition ?? "-"}</strong>
          </p>
          <p>
            Letak Buku: <strong>{req.book?.storage_location ?? "-"}</strong>
          </p>
          <p>
            Stok Tersedia: <strong>{req.book?.availability_stock ?? 0}</strong>
          </p>

          <p className="text-paragraph font-semibold">
            Tanggal Peminjaman: <strong>{formatDate(req.created_at)}</strong>
          </p>

          {/* Jika stok habis */}
          {req.book?.available_stock === 0 && (
            <p className="font-semibold my-6 flex items-center gap-2 text-[var(--color_error)]">
              <i className="ri-error-warning-line" />
              Stok buku habis. Tidak dapat menyetujui permintaan.
            </p>
          )}

          {/* Input tanggal */}
          <div className="flex items-center gap-2 mt-4">
            <label className="text-paragraph">Tanggal Pengembalian:</label>
            <input
              type="date"
              className="text-subtitle font-semibold border border-[var(--color_text_title)]/30 px-4 p-1 rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Tombol aksi */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleApprove}
              disabled={!dueDate || req.book?.available_stock === 0}
              className={`btn-save ${
                !dueDate || req.book?.available_stock === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Izinkan
            </button>

            <button onClick={onReject} className="btn-cancel">
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowCard;
