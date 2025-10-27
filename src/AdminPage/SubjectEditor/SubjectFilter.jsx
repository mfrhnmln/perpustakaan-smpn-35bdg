const SubjectFilter = ({
  searchQuery, // String: kata kunci pencarian dari input
  setSearchQuery, // Function: setter untuk update kata kunci pencarian
  totalSubjects, // Number: total subject yang ditampilkan (setelah filter)
  loading = false, // Optional: status loading, default false
}) => {
  return (
    // Wrapper fleksibel untuk tampilan mobile dan desktop
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 py-5">
      {/* Input pencarian berdasarkan nama Subject */}
      <div className="text-paragraph relative w-full lg:max-w-md">
        <input
          name="search"
          type="text"
          placeholder="Cari nama subject..." // Placeholder saat input kosong
          value={searchQuery} // Controlled input
          onChange={(e) => setSearchQuery(e.target.value)} // Ubah state pencarian saat user mengetik
          disabled={loading} // Disable saat loading (opsional)
          className="w-full p-2 pr-10 hover:brightness-120 transition duration-200 ease-in-out hover:shadow-md border rounded border-[var(--background_button)]"
        />
        <i className="ri-search-2-line absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
      </div>

      {/* Informasi total data Subject */}
      <p className="text-subtitle w-full ml-auto text-right lg:max-w-40">
        Total: <span className="font-bold">{totalSubjects}</span> data
      </p>
    </div>
  );
};

export default SubjectFilter;
