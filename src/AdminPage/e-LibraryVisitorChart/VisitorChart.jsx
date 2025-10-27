import React from "react";
import { useLibraryStats } from "./useLibraryStats";
import ViewChart from "./ViewChart";
import LikeChart from "./LikeChart";
import BorrowStat from "./BorrowStat";
import UserBorrowChart from "./UserBorrowChart";
import LoadingOverlay from "../../Function/LoadingOverlay";

const VisitorChart = () => {
  const {
    topViews,
    topLikes,
    totalBorrowers,
    topBorrowers,
    loading,
    error,
  } = useLibraryStats();

  if (loading)
    return <LoadingOverlay show message="Memuat statistik buku..." />;

  if (error) return <p className="p-4 text-center">{error}</p>;

  return (
      <div className="space-y-10 ">
      <ViewChart data={topViews} />
      <LikeChart data={topLikes} />
      <UserBorrowChart data={topBorrowers} />
      <BorrowStat total={totalBorrowers} />
    </div>
  );
};

export default VisitorChart;
