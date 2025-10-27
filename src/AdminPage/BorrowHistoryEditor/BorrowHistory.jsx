import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingOverlay from "../../Function/LoadingOverlay";

import BorrowHistoryList from "./BorrowHistoryList";
import { handleClearHistory } from "./BorrowHistoryDelete";
import { handleDownloadCSV } from "./BorrowHistoryPrint";

import BorrowData from "../../Data/BorrowData";

const BorrowHistory = () => {
  const [requests, setRequests] = useState([]);
  const [notes, setNotes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("approved");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  // Ambil data dummy BorrowData
  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setRequests([
        ...BorrowData.approved,
        ...BorrowData.rejected,
        ...BorrowData.returned,
      ]);
    } catch {
      toast.error("Gagal memuat riwayat.");
    } finally {
      setIsLoading(false);
    }
  };

  // Tandai sebagai dikembalikan
  const handleReturn = async (id, note) => {
    if (!note) {
      toast.error("Masukkan catatan pengembalian terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulasi async

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                status: "returned",
                returned_at: new Date(),
                return_note: note,
              }
            : req
        )
      );

      toast.success("Buku berhasil ditandai sebagai dikembalikan.");
    } catch {
      toast.error("Gagal menandai pengembalian.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter berdasarkan pencarian + status
  const filteredRequests = requests.filter((req) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      req.user?.name?.toLowerCase().includes(search) ||
      req.nama?.toLowerCase().includes(search) ||
      req.book?.title?.toLowerCase().includes(search);

    const matchesStatus = filterStatus === "all" || req.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative bg-[var(--background_component)]">
      <LoadingOverlay
        show={isLoading}
        message="Memuat data riwayat peminjaman buku..."
      />

      <div className="px-5 py-10 text-left border-b border-[var(--color_text_title)]/30">
        <h1 className="text-title font-bold">Riwayat Peminjaman</h1>
      </div>

      <div className="px-5">
        {/* Tombol Aksi */}
        <div className="py-5 text-left border-b border-[var(--color_text_title)]/30">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleDownloadCSV(requests)}
              className="btn-default"
            >
              Download CSV
            </button>
            <button
              onClick={() => handleClearHistory(setIsLoading, setRequests)}
              className="btn-default"
            >
              Bersihkan Riwayat
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex justify-between items-center py-4 flex-wrap gap-4">
          <div className="relative w-full lg:max-w-md">
            <input
              type="text"
              placeholder="Cari nama peminjam atau judul buku..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-paragraph w-full px-4 py-2 pr-10 border border-[var(--color_text_title)]/30 rounded"
            />
            <i className="ri-search-2-line text-paragraph absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
          </div>

          {/* Filter Status */}
          <div className="relative inline-block">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none btn-dropdownicon w-36 pr-10"
            >
              <option value="all">Semua</option>
              <option value="approved">Disetujui</option>
              <option value="returned">Dikembalikan</option>
              <option value="rejected">Ditolak</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <i className="ri-arrow-down-s-line text-[var(--color_text_button)]"></i>
            </span>
          </div>
        </div>

        {/* List Riwayat */}
        <BorrowHistoryList
          requests={filteredRequests}
          notes={notes}
          setNotes={setNotes}
          handleReturn={handleReturn}
          filterStatus={filterStatus}
        />
      </div>
    </div>
  );
};

export default BorrowHistory;
