import { useState } from "react";

const BorrowHistoryCard = ({ req, onReturn }) => {
  const user = req.user; // sudah join di getBorrowWithUser
  const [note, setNote] = useState("");

  // formatter tanggal (sama kayak di BorrowCard)
  const formatDate = (date) =>
    date
      ? new Intl.DateTimeFormat("id-ID", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(date))
      : "-";

  return (
    <div className="border border-[var(--color_text_title)]/30 p-4 rounded-lg my-5 shadow">
      <div className="flex flex-col md:flex-row items-start gap-6 my-5">
        {/* Gambar buku */}
        <img
          src={req.book?.cover}
          alt={req.book?.title}
          className="mx-auto w-60 h-80 object-contain rounded-md"
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
            Penulis: <strong>{req.book?.author ?? "-"}</strong>
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

          <p className="text-paragraph font-semibold">
            Tanggal Peminjaman: <strong>{formatDate(req.created_at)}</strong>
          </p>

          <p className="text-paragraph font-semibold">
            Tanggal Pengembalian:{" "}
            <strong>{formatDate(req.due_date, false)}</strong>
          </p>

          <p className="text-paragraph font-semibold">
            Status: <strong>{req.status}</strong>
          </p>

          {/* jika sudah dikembalikan & ada catatan */}
          {req.status === "returned" && req.return_note && (
            <p className="italic text-gray-600">{req.return_note}</p>
          )}

          {/* jika status masih approved → input catatan pengembalian */}
          {req.status === "approved" && (
            <div className="mt-4">
              <label className="text-paragraph">Catatan Pengembalian:</label>
              <textarea
                placeholder="Masukkan catatan pengembalian"
                className="text-subtitle w-full border border-[var(--color_text_title)]/30 p-2 rounded mt-2"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex gap-4 mt-6 justify-end">
                <button onClick={() => onReturn(note)} className="btn-default">
                  Tandai Dikembalikan
                </button>
              </div>
            </div>
          )}

          {/* jika status ditolak */}
          {req.status === "rejected" && (
            <p className="text-red-500 text-subtitle font-semibold mt-4">
              Permintaan ini telah ditolak.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowHistoryCard;
