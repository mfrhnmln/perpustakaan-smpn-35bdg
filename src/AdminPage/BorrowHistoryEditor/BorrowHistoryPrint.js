import { getBorrowWithUser } from "../../Data/BorrowData";

export const handleDownloadCSV = (history) => {
  const data = getBorrowWithUser(history); // gabungkan dengan data user

  const csv = [
    ["Nama", "Kelas", "Judul Buku", "Tanggal Pinjam", "Tanggal Kembali", "Catatan"],
    ...data.map((item) => [
      item.user?.name || "-",
      item.user?.kelas || "-",
      item.book?.title || "-",
      item.created_at ? new Date(item.created_at).toLocaleDateString() : "-",
      item.due_date ? new Date(item.due_date).toLocaleDateString() : "-",
      item.return_note || "-",
    ]),
  ]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`) // bungkus biar aman
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "riwayat_peminjaman.csv";
  a.click();
  URL.revokeObjectURL(url);
};
