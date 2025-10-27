import BorrowHistoryCard from "./BorrowHistoryCard";
import { getBorrowWithUser } from "../../Data/BorrowData";

const BorrowHistoryList = ({ requests, notes, setNotes, handleReturn, filterStatus }) => {
  const requestsWithUser = getBorrowWithUser(requests);

  const grouped = {
    approved: requestsWithUser.filter((req) => req.status === "approved"),
    rejected: requestsWithUser.filter((req) => req.status === "rejected"),
    returned: requestsWithUser.filter((req) => req.status === "returned"),
  };

  const renderSection = (label, items) => (
    <>
      <h1 className="text-title font-bold">{label}</h1>
      {items.length === 0 ? (
        <p className="text-subtitle text-center py-20">
          Belum ada data peminjaman.
        </p>
      ) : (
        items.map((req) => (
          <BorrowHistoryCard
            key={req.id}
            req={req}
            note={notes[req.id] || ""}
            setNote={(val) => setNotes((prev) => ({ ...prev, [req.id]: val }))}
            onReturn={(note) => handleReturn(req.id, note)}
          />
        ))
      )}
    </>
  );

  return (
    <div>
      {(filterStatus === "all" || filterStatus === "approved") &&
        renderSection("Disetujui", grouped.approved)}

      {(filterStatus === "all" || filterStatus === "rejected") &&
        renderSection("Ditolak", grouped.rejected)}

      {(filterStatus === "all" || filterStatus === "returned") &&
        renderSection("Dikembalikan", grouped.returned)}
    </div>
  );
};

export default BorrowHistoryList;
