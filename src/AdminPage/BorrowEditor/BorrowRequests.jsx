import { useEffect, useState } from "react";
import LoadingOverlay from "../../Function/LoadingOverlay";
import { toast } from "react-toastify";
import BorrowList from "./BorrowList";
import BorrowData from "../../Data/BorrowData";

const BorrowRequests = ({ status = "pending" }) => {
  const [requests, setRequests] = useState([]);
  const [dueDates, setDueDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setRequests(BorrowData[status] || []);
      setIsLoading(false);
    }, 500);
  }, [status]);

  const handleAction = (id, action) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Permintaan berhasil di${action}.`);
  };

  const filteredRequests = requests.filter((req) => {
    const search = searchTerm.toLowerCase();
    return (
      req.nama?.toLowerCase().includes(search) ||
      req.book?.title?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="relative bg-[var(--background_component)]">
      <LoadingOverlay show={isLoading} message="Memuat data permintaan..." />

      <div className="px-5 py-10 text-left border-b border-[var(--color_text_title)]/30">
        <h1 className="text-title font-bold">Daftar Peminjaman</h1>
      </div>

      <div className="p-5">
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Cari nama peminjam atau judul buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-paragraph w-full px-4 py-2 pr-10 border rounded border-[var(--color_text_title)]/30"
          />
          <i className="ri-search-2-line text-paragraph absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
        </div>

        {filteredRequests.length === 0 && !isLoading ? (
          <p className="text-subtitle text-center px-4 py-20">
            Tidak ada data {status}.
          </p>
        ) : (
          <BorrowList
            requests={filteredRequests}
            dueDates={dueDates}
            setDueDates={setDueDates}
            handleAction={handleAction}
          />
        )}
      </div>
    </div>
  );
};

export default BorrowRequests;
