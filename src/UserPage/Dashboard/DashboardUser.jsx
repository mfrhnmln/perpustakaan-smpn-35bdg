import { useState, useEffect } from "react";
import BooksData, { BorrowUsers } from "../../Data/BooksData";
import { useResponsiveCounts } from "./ResponsiveCounts";

import ClassificationSection from "./ClassificationSection";
import PopularBooksSection from "./PopularBooksSection";
import LatestBooksSection from "./LatestBooksSection";
import BorrowUsersSection from "./BorrowUsersSection";
import MapInfoSection from "./MapInfoSection";

const DashboardUser = () => {
  const [popularIndex, setPopularIndex] = useState(0);
  const [newIndex, setNewIndex] = useState(0);
  const [borrowIndex, setBorrowIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { visibleCountBook, visibleCountClassification } =
    useResponsiveCounts();

  const popularBooks = [...BooksData]
    .sort((a, b) => b.view - a.view)
    .slice(0, 20);
  const latestBooks = [...BooksData].sort((a, b) => b.id - a.id).slice(0, 20);
  const topBorrowUsers = [...BorrowUsers]
    .sort((a, b) => b.borrowCount - a.borrowCount)
    .slice(0, 20);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopularIndex((prev) => (prev + 1) % popularBooks.length);
      setNewIndex((prev) => (prev + 1) % latestBooks.length);
      setBorrowIndex((prev) => (prev + 1) % topBorrowUsers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [popularBooks.length, latestBooks.length, topBorrowUsers.length]);

  return (
    <div className="flex flex-col">
      {/* halaman utama */}
      <div className="flex flex-col gap-20 px-6 py-20">
        {/* Subject Buku */}
        <ClassificationSection
          isOpen={showModal}
          visibleCountClassification={visibleCountClassification}
          setShowModal={setShowModal}
        />
        
        <PopularBooksSection
          books={popularBooks}
          popularIndex={popularIndex}
          visibleCountBook={visibleCountBook}
        />
        <LatestBooksSection
          books={latestBooks}
          newIndex={newIndex}
          visibleCountBook={visibleCountBook}
        />
        <BorrowUsersSection
          users={topBorrowUsers}
          borrowIndex={borrowIndex}
          visibleCountBook={visibleCountBook}
        />
      </div>
      <MapInfoSection />
    </div>
  );
};

export default DashboardUser;
