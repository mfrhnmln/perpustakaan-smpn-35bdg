import { useEffect, useState } from "react";

const BookCover = ({
  book,
  isEditing,
  fileInputRef,
  setNewCover,
  showImageModal,
  setShowImageModal,
  newCover,
}) => {
  const [previewCover, setPreviewCover] = useState(null);

  // Reset preview saat newCover dibatalkan
  useEffect(() => {
    if (!newCover) {
      setPreviewCover(null);
    }
  }, [newCover]);

  // Nonaktifkan scroll saat modal dibuka
  useEffect(() => {
    if (showImageModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showImageModal]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCover(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // biar bisa pilih file yang sama lagi
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        {isEditing && previewCover ? (
          // Preview sebelum & sesudah
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-6 justify-center">
              {/* Sebelum */}
              <div className="flex flex-col items-center">
                <span className="text-subtitle font-semibold">Sebelum</span>
                <img
                  src={book.cover}
                  alt="Old Cover"
                  className="w-32 h-full object-contain rounded"
                />
              </div>

              {/* Sesudah */}
              <div className="flex flex-col items-center">
                <span className="text-subtitle font-semibold">Sesudah</span>
                <img
                  src={previewCover}
                  alt="New Cover"
                  className="w-32 h-full object-contain rounded"
                />
              </div>
            </div>

            <button onClick={openFilePicker} className="btn-save mt-4">
              upload
            </button>
          </div>
        ) : (
          // Tampilan awal sebelum ganti gambar
          <div className="flex flex-col items-center">
            <img
              src={book.cover}
              alt={book.title}
              className="w-20 h-full object-contain rounded cursor-pointer"
              onClick={() =>
                isEditing ? openFilePicker() : setShowImageModal(true)
              }
            />
            {isEditing && (
              <button onClick={openFilePicker} className="btn-save mt-4">
                upload
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal zoom */}
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <img
            src={book.cover}
            alt="Cover"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default BookCover;
