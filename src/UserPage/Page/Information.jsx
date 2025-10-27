import { useNavigate } from "react-router-dom";

const Information = () => {
  const navigate = useNavigate();

  return (
    <div className="md:p-5">
      <div className="relative py-5 mx-auto bg-[var(--background_component)] rounded-lg shadow-xl">
        {/* Tombol kembali */}
        <div className="px-5">
          <button
            onClick={() => navigate("/")}
            className="btn-default transition"
          >
            <i className="ri-arrow-left-wide-line"></i> Kembali
          </button>
        </div>

        {/* Judul utama */}
        <div className="pt-10 pb-5 px-5 border-b border-[var(--color_text_title)]/30">
          <h1 className="text-title font-bold">
            Informasi Perpustakaan SMPN 35 Bandung
          </h1>
        </div>

        {/* Konten */}
        <div className="px-5 py-8 space-y-10">
          {/* Contact Information */}
          <section>
            <h2 className="text-subtitle font-semibold mb-4">
              Informasi Kontak
            </h2>
            <p className="mb-2">
              <strong>Alamat :</strong> <br />
              Jalan Dago Pojok No.12, Dago, Coblong, Jl. Dago Barat No.54, Dago,
              Kecamatan Coblong, Kota Bandung, Jawa Barat, Indonesia 40135
            </p>
            <p className="mb-2">
              <strong>No Telp. :</strong> <br />
              (022) 9172638
            </p>
            <p>
              <strong>Fax Number :</strong> <br />
              (022) 9172638
            </p>
          </section>

          {/* Opening Hours */}
          <section>
            <h2 className="text-subtitle font-semibold mb-4">Jam Buka</h2>
            <p className="font-semibold">Senin - Jum'at :</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Buka : 08.00 AM</li>
              <li>Istirahat : 13.00 - 13.30 PM</li>
              <li>Tutup : 16.00 PM</li>
            </ul>
          </section>

          {/* Collections */}
          <section>
            <h2 className="text-subtitle font-semibold mb-4">Koleksi</h2>
            <p className="text-paragraph text-justify">
              Kami memiliki beragam jenis koleksi di perpustakaan kami, mulai
              dari Fiksi hingga Materi Sains, dari materi cetak hingga koleksi
              digital seperti CD-ROM, CD, VCD, dan DVD. Kami juga mengoleksi
              terbitan berseri harian seperti surat kabar dan juga terbitan
              berseri bulanan seperti majalah.
            </p>
          </section>

          {/* Library Membership */}
          <section>
            <h2 className="text-subtitle font-semibold mb-4">
              Keanggotaan Perpustakaan
            </h2>
            <p className="text-paragraph text-justify">
              Untuk dapat meminjam koleksi perpustakaan kami, Anda harus
              terlebih dahulu menjadi anggota perpustakaan. Ada syarat dan
              ketentuan yang harus Anda patuhi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Information;
