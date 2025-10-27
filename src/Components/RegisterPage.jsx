import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen md:px-20 bg-[var(--background)]">
      {/* isi konten */}
      <div className="relative flex p-6 shadow-xl rounded-2xl w-full max-w-4xl bg-[var(--background_component)]">
        {/* Form Login */}
        <div className="flex w-full md:w-1/2 justify-center">
          <RegisterForm />
        </div>

        {/* Gambar & Quote */}
        <div className="relative hidden md:flex md:w-1/2 justify-center ">
          {/* img */}
          <img
            src="Img/ayok_ke_perpus.png"
            alt="img"
            className="w-96 h-full pb-45 lg:pb-50 rounded-r-xl object-contain"
          />

          {/* kata-kata */}
          <div className="text-paragraph absolute bottom-22 p-6 rounded drop-shadow-lg bg-[var(--background_component)]">
            <p>
              “Datanglah ke perpustakaan dan temukan kisah yang belum pernah
              kamu dengar sebelumnya, Buatlah dirimu menjadi lebih pintar dan
              lebih cerdas dengan membaca.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
