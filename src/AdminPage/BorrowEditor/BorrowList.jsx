import BorrowCard from "./BorrowCard";
import { getBorrowWithUser } from "../../Data/BorrowData";

const BorrowList = ({ requests, dueDates, setDueDates, handleAction }) => {
  const requestsWithUser = getBorrowWithUser(requests);

  return (
    <>
      {requestsWithUser.map((req) => (
        <BorrowCard
          key={req.id}
          req={req}
          dueDate={dueDates[req.id] || ""}
          setDueDate={(val) =>
            setDueDates((prev) => ({ ...prev, [req.id]: val }))
          }
          onApprove={() => {
            if (req.book?.available_stock > 0) {
              handleAction(req.id, "approve");
            } else {
              alert("Stok buku habis. Tidak bisa menyetujui peminjaman.");
            }
          }}
          onReject={() => handleAction(req.id, "reject")}
        />
      ))}
    </>
  );
};

export default BorrowList;
