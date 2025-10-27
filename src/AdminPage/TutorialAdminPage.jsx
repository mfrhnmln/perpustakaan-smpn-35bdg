import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../Function/LoadingOverlay";

const TutorialAdminPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Dummy data
  useEffect(() => {
    const dummyTutorials = [
      // data1
      {
        id: 1,
        title: "Halaman Dashboard Admin",
        image: "/Tutorial_Admin/Halaman_Dashboard_Admin.png",
        imageTitle: "Gambar1. Halaman Dashboard Admin",
        description:
          "Halaman Dashboard Admin menampilkan Buku paling banyak dilihat, Buku paling banyak disukai, Peminjam buku terbanyak, dan Total peminjaman buku.",
      },
      // data2
      {
        id: 2,
        title: "Halaman Buku Editor",
        image: "/Tutorial_Admin/Halaman_Buku_Editor.png",
        imageTitle: "Gambar2. Halaman Buku Editor",
        description:
          "Halaman Buku Editor menampilkan semua data buku yang bisa di tambah, edit dan hapus oleh admin, jika ingin menambahkan data Klik 'Tambah Buku' lalu masukan semua data buku yang diperlukan, jika penulis atau genre belum ada, maka harus ditambahkan di halaman genre atau penulis terlebih dahulu.",
      },
      // data3
      {
        id: 3,
        title: "Cara menambahkan Buku baru",
        image: "/Tutorial_Admin/Halaman_Tambah_Buku.png",
        imageTitle: "Gambar3. Halaman Tambah Buku",
        description:
          "Pada halaman tambah buku baru, admin diwajibkan mengisi seluruh data yang dibutuhkan, namun jika buku hanya tersedia buku fisik maka pdf bisa dikosongkan, sebelum admin menambahkan buku baru, admin perlu menambahkan genre dan penulis pada halaman masing-masing.",
      },
      // data4
      {
        id: 4,
        title: "Halaman Genre Editor",
        image: "/Tutorial_Admin/Halaman_Genre_editor.png",
        imageTitle: "Gambar4. Halaman Genre Editor",
        description:
          "Halaman Genre Editor menampilkan semua data Genre yang bisa di tambah, edit dan hapus oleh admin, jika ingin menambahkan data Klik 'Tambah Genre' lalu masukan semua data buku yang diperlukan.",
      },
      // data5
      {
        id: 5,
        title: "Cara menambahkan Genre baru",
        image: "/Tutorial_Admin/Halaman_Tambah_Genre.png",
        imageTitle: "Gambar5. Halaman Tambah Genre Baru",
        description:
          "Pada halaman Tambah Genre Baru, admin diwajibkan mengisi seluruh data yang dibutuhkan",
      },
      // data6
      {
        id: 6,
        title: "Halaman Penulis Editor",
        image: "/Tutorial_Admin/Halaman_Penulis_editor.png",
        imageTitle: "Gambar6. Halaman Penulis Editor",
        description:
          "Halaman Penulis Editor menampilkan semua data Penulis yang bisa di tambah, edit dan hapus oleh admin, jika ingin menambahkan data Klik 'Tambah Penulis' lalu masukan semua data buku yang diperlukan.",
      },
      {
        id: 7,
        title: "Cara menambahkan Penulis baru",
        image: "/Tutorial_Admin/Halaman_Tambah_Penulis.png",
        imageTitle: "Gambar7. Halaman Tambah Penulis",
        description:
          "Pada halaman Tambah Penulis Baru, admin diwajibkan mengisi seluruh data yang dibutuhkan",
      },
      {
        id: 8,
        title: "Halaman Daftar Pengajuan Peminjaman Buku",
        image: "/Tutorial_Admin/Halaman_Daftar_Pengajuan_Peminjaman.png",
        imageTitle: "Gambar8. Halaman Daftar Pengajuan Peminjaman Buku",
        description:
          "-",
      },
      {
        id: 9,
        title: "Halaman Riwayat Peminjaman",
        image: "/Tutorial_Admin/Halaman_Riwayat_Peminjaman.png",
        imageTitle: "Gambar9. Halaman Riwayat Peminjaman",
        description:
          "-",
      },
    ];

    // Simulasi loading
    setTimeout(() => {
      setTutorials(dummyTutorials);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="md:p-5">
      <div className="relative py-5 mx-auto bg-[var(--background_component)] rounded-lg shadow-xl">
        {loading && <LoadingOverlay show={true} message="Memuat panduan..." />}

        {/* Tombol kembali */}
        <div className="px-5">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="btn-default transition"
          >
            <i className="ri-arrow-left-wide-line"></i> Kembali
          </button>
        </div>

        <div className="pt-10 pb-5 px-5 border-b border-[var(--color_text_title)]/30">
          <h1 className="text-title font-bold">Panduan Penggunaan</h1>
        </div>

        <div className="px-5">
          {tutorials.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 py-10">
              <h2 className="text-subtitle font-semibold mb-2">{item.title}</h2>

              <img
                src={item.image}
                alt={item.title}
                className="w-full max-w-4xl mx-auto object-cover rounded shadow"
              />

              <p className="text-img-caption mt-2 text-center">
                {item.imageTitle}
              </p>
              <p className="text-paragraph text-justify mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialAdminPage;
