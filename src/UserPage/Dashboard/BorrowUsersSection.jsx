const BorrowUsersSection = ({ users, borrowIndex, visibleCountBook }) => {
  const getVisibleItems = (items, startIndex, count) => {
    return Array.from({ length: count }, (_, i) => 
      items[(startIndex + i) % items.length]
    );
  };

  return (
    <section className="w-full max-w-5xl mx-auto">
      <h2 className="text-title mb-4">Peminjam Buku Terbanyak</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {getVisibleItems(users, borrowIndex, visibleCountBook).map((user, idx) => (
          <div
            key={idx}
            className="p-4 bg-[var(--background_component)]/80 rounded-xl shadow text-center"
          >
            <p className="text-subtitle font-bold">{user.name}</p>
            <p className="text-paragraph">{user.kelas}</p>
            <p
              className="text-paragraph font-semibold"
              style={{ color: "var(--color_info)" }}
            >
              {user.borrowCount}x pinjam
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BorrowUsersSection;
