import { useLibraryStats } from "./useLibraryStats";

const BorrowStat = () => {
  const { totalBorrowed } = useLibraryStats();
  return (
    <div className="rounded-lg shadow p-6 text-center bg-[var(--background_component)]">
      <h1 className="text-title font-bold mb-4">Total Peminjaman Buku</h1>
      <p className="text-title font-bold flex items-center justify-center">
        <i className="ri-user-3-fill mr-2 text-lg"></i>
        {totalBorrowed}
      </p>
    </div>
  );
};

export default BorrowStat;
