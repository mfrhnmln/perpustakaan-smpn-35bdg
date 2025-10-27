import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../Function/LoadingOverlay";

const TutorialUserPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Dummy data
  useEffect(() => {
    const dummyTutorials = [
      // gambar1
      {
        id: 1,
        title: "Halaman Utama",
        image: "/Tutorial_User/Halaman_Utama.png",
        imageTitle: "Gambar 1. Halaman Utama",
        description:
          "Halaman Utama menampilkan semua buku yang ada di Perpustakaan SMPN 35 Bandung.",
      },
      // gambar2
      {
        id: 2,
        title: "Detail Buku",
        image: "/Tutorial_User/Detail_Buku.png",
        imageTitle: "Gambar 2. Detail Halaman",
        description:
          "Anda dapat memilih buku dengan cara Klik buku, lalu anda bisa memilih untuk membaca buku secara online atau meminjam buku fisik.",
      },
      // gambar3
      {
        id: 3,
        title: "Baca Buku secara Online",
        image: "/Tutorial_User/Baca_Online.png",
        imageTitle: "Gambar 1. Baca Buku secara Online",
        description:
          "Halaman baca buku secara online, anda dapat membaca buku tanpa perlu mendownload terlebih dahulu, selain itu anda juga dapat memberikan like pada buku yang sedang dibaca dengan cara klik pojok kanan bawah.",
      },
      // gambar4
      {
        id: 4,
        title: "Halaman Pinjam Buku",
        image: "/Tutorial_User/Halaman_Pinjam_Buku.png",
        imageTitle: "Gambar 4. Halaman Pinjam Buku",
        description:
          "Halaman pinjam buku, sebelumnya anda diwajibkan untuk login terlebih dahulu, jika sudah anda diharuskan mengisi nama dan kelas untuk peminjaman buku, lalu klik tombol 'pinjam Buku', setelah itu anda bisa status buku di profile anda",
      },
      // gambar5
      {
        id: 5,
        title: "Halaman Profil",
        image: "/Tutorial_User/Profil_User.png",
        imageTitle: "Gambar 5. Halaman Profil",
        description: "-",
      },
      // gambar6
      {
        id: 6,
        title: "Cari Buku berdasarkan Judul",
        image: "/Tutorial_User/Halaman_Utama.png",
        imageTitle: "Gambar 6. Cari Buku berdasarkan Judul",
        description: "-",
      },
      // gambar7
      {
        id: 7,
        title: "Filter Berdasarkan Genre",
        image: "/Tutorial_User/Filter_Genre.png",
        imageTitle: "Gambar 6. Filter Berdasarkan Genre",
        description: "-",
      },
      // gambar8
      {
        id: 8,
        title: "Filter Berdasarkan Penulis",
        image: "/Tutorial_User/Filter_Penulis.png",
        imageTitle: "Gambar 6. Filter Berdasarkan Penulis",
        description: "-",
      },
      // gambar9
      {
        id: 9,
        title: "Urutkan Buku Berdasarkan Populer dan Baru",
        image: "/Tutorial_User/Halaman_Utama.png",
        imageTitle: "Gambar 6. Urutkan Buku Berdasarkan Populer dan Baru",
        description: "-",
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
            onClick={() => navigate("/")}
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

export default TutorialUserPage;
