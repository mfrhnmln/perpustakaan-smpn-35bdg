import { useEffect, useState } from "react";
import BooksData, { BorrowUsers } from "../../Data/BooksData";

export const useLibraryStats = () => {
  const [topViews, setTopViews] = useState([]);
  const [topLikes, setTopLikes] = useState([]);
  const [topBorrowers, setTopBorrowers] = useState([]);
  const [totalBorrowed, setTotalBorrowed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      // Urutkan berdasarkan view (ambil 10 teratas)
      const sortedViews = [...BooksData]
        .sort((a, b) => Number(b.view) - Number(a.view))
        .slice(0, 10);

      // Urutkan berdasarkan like (ambil 10 teratas)
      const sortedLikes = [...BooksData]
        .sort((a, b) => Number(b.like) - Number(a.like))
        .slice(0, 10);

      // Urutkan borrowers (ambil 10 teratas)
      const sortedBorrowers = [...BorrowUsers]
        .sort((a, b) => b.borrowCount - a.borrowCount)
        .slice(0, 10);

      // Hitung total peminjaman buku
      const total = BorrowUsers.reduce(
        (acc, user) => acc + user.borrowCount,
        0
      );

      setTopViews(sortedViews);
      setTopLikes(sortedLikes);
      setTopBorrowers(sortedBorrowers);
      setTotalBorrowed(total);
    } catch (err) {
      console.error("Error processing data:", err);
      setError("Gagal memuat data lokal");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    topViews,
    topLikes,
    topBorrowers,
    totalBorrowed,
    loading,
    error,
  };
};
