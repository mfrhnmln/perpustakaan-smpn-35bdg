import { toast } from "react-toastify";

export const handleClearHistory = async (setIsLoading, setHistory) => {
  const confirmed = window.confirm(
    "Yakin ingin menghapus semua riwayat peminjaman?"
  );
  if (!confirmed) return;

  try {
    setIsLoading(true);

    // Simulasi proses async
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Hapus semua data riwayat
    setHistory([]);

    toast.success("Riwayat berhasil dibersihkan.");
  } catch (error) {
    console.error("Gagal membersihkan riwayat:", error);
    toast.error("Gagal membersihkan riwayat.");
  } finally {
    setIsLoading(false);
  }
};
