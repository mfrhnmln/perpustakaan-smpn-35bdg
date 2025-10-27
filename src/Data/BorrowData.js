import BooksData, { BorrowUsers } from "./BooksData";

// helper
const findBookById = (id) => BooksData.find((book) => book.id === id);
const findUserById = (id) => BorrowUsers.find((user) => user.id === id);

const BorrowData = {
  pending: [
    { id: 1, user_id: 1, status: "pending", created_at: "2025-03-3", book: findBookById(1) },
    { id: 2, user_id: 2, status: "pending", created_at: "2025-03-4",book: findBookById(2) },
    { id: 3, user_id: 3, status: "pending", created_at: "2025-03-5",book: findBookById(3) },
    { id: 4, user_id: 4, status: "pending", created_at: "2025-03-6",book: findBookById(4) },
    { id: 5, user_id: 5, status: "pending", created_at: "2025-03-7",book: findBookById(5) },
    { id: 6, user_id: 6, status: "pending", created_at: "2025-03-10",book: findBookById(6) },
    { id: 7, user_id: 7, status: "pending", created_at: "2025-03-11",book: findBookById(7) },
    { id: 8, user_id: 8, status: "pending", created_at: "2025-03-12",book: findBookById(8) },
    { id: 9, user_id: 9, status: "pending", created_at: "2025-03-13",book: findBookById(9) },
    { id: 10, user_id: 10, status: "pending", created_at: "2025-03-14",book: findBookById(10) },
    { id: 11, user_id: 11, status: "pending", created_at: "2025-03-17",book: findBookById(10) },
    { id: 12, user_id: 12, status: "pending", created_at: "2025-03-18",book: findBookById(10) },
  ],
  approved: [
    { id: 13, user_id: 1, status: "approved", created_at: "2025-03-3", due_date: "2025-03-6", book: findBookById(11) },
    { id: 14, user_id: 2, status: "approved", created_at: "2025-03-4", due_date: "2025-03-7", book: findBookById(12) },
    { id: 15, user_id: 3, status: "approved", created_at: "2025-03-5", due_date: "2025-03-10", book: findBookById(13) },
    { id: 16, user_id: 4, status: "approved", created_at: "2025-03-6", due_date: "2025-03-11", book: findBookById(14) },
    { id: 17, user_id: 5, status: "approved", created_at: "2025-03-7", due_date: "2025-03-12", book: findBookById(15) },
    { id: 18, user_id: 6, status: "approved", created_at: "2025-03-10", due_date: "2025-03-13", book: findBookById(16) },
    { id: 19, user_id: 7, status: "approved", created_at: "2025-03-11", due_date: "2025-03-14", book: findBookById(17) },
    { id: 20, user_id: 8, status: "approved", created_at: "2025-03-12", due_date: "2025-03-17", book: findBookById(18) },
    { id: 21, user_id: 9, status: "approved", created_at: "2025-03-13", due_date: "2025-03-18", book: findBookById(19) },
    { id: 22, user_id: 10, status: "approved", created_at: "2025-03-14", due_date: "2025-03-19", book: findBookById(20) },
    { id: 23, user_id: 11, status: "approved", created_at: "2025-03-17", due_date: "2025-03-20", book: findBookById(21) },
    { id: 24, user_id: 12, status: "approved", created_at: "2025-03-18", due_date: "2025-03-21", book: findBookById(22) },
  ],
  rejected: [
    { id: 25, user_id: 1, status: "rejected", created_at: "2025-03-4", book: findBookById(21) },
    { id: 26, user_id: 2, status: "rejected", created_at: "2025-03-5", book: findBookById(22) },
    { id: 27, user_id: 3, status: "rejected", created_at: "2025-03-6", book: findBookById(23) },
    { id: 28, user_id: 4, status: "rejected", created_at: "2025-03-7", book: findBookById(24) },
    { id: 29, user_id: 5, status: "rejected", created_at: "2025-03-10", book: findBookById(25) },
    { id: 30, user_id: 6, status: "rejected", created_at: "2025-03-11", book: findBookById(26) },
    { id: 31, user_id: 7, status: "rejected", created_at: "2025-03-12", book: findBookById(27) },
    { id: 32, user_id: 8, status: "rejected", created_at: "2025-03-13", book: findBookById(28) },
    { id: 33, user_id: 9, status: "rejected", created_at: "2025-03-14", book: findBookById(29) },
    { id: 34, user_id: 10, status: "rejected", created_at: "2025-03-17", book: findBookById(30) },
    { id: 35, user_id: 11, status: "rejected", created_at: "2025-03-18", book: findBookById(31) },
    { id: 36, user_id: 12, status: "rejected", created_at: "2025-03-19", book: findBookById(32) },
  ],
  returned: [
    { id: 37, user_id: 1, status: "returned", created_at: "2025-03-3", due_date: "2025-03-6", book: findBookById(1) },
    { id: 38, user_id: 2, status: "returned", created_at: "2025-03-4", due_date: "2025-03-7", book: findBookById(2) },
    { id: 39, user_id: 3, status: "returned", created_at: "2025-03-5", due_date: "2025-03-10", book: findBookById(3) },
    { id: 40, user_id: 4, status: "returned", created_at: "2025-03-6", due_date: "2025-03-11", book: findBookById(4) },
    { id: 41, user_id: 5, status: "returned", created_at: "2025-03-7", due_date: "2025-03-12", book: findBookById(5) },
    { id: 42, user_id: 6, status: "returned", created_at: "2025-03-10", due_date: "2025-03-13", book: findBookById(6) },
    { id: 43, user_id: 7, status: "returned", created_at: "2025-03-11", due_date: "2025-03-14", book: findBookById(7) },
    { id: 44, user_id: 8, status: "returned", created_at: "2025-03-12", due_date: "2025-03-17", book: findBookById(8) },
    { id: 45, user_id: 9, status: "returned", created_at: "2025-03-13", due_date: "2025-03-18", book: findBookById(9) },
    { id: 46, user_id: 10, status: "returned", created_at: "2025-03-14", due_date: "2025-03-19", book: findBookById(10) },
    { id: 47, user_id: 11, status: "returned", created_at: "2025-03-17", due_date: "2025-03-20", book: findBookById(10) },
    { id: 48, user_id: 12, status: "returned", created_at: "2025-03-18", due_date: "2025-03-21", book: findBookById(10) },
  ],
};

// fungsi join user + buku → dipakai di komponen
export const getBorrowWithUser = (arr) =>
  arr.map((entry) => ({
    ...entry,
    user: findUserById(entry.user_id),
  }));

export default BorrowData;
