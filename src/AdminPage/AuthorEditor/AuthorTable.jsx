import { useState } from "react";
import AuthorEdit from "./AuthorEdit";
import AuthorDelete from "./AuthorDelete";

const AuthorTable = ({ authors, fetchAuthors }) => {
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [deletingAuthor, setDeletingAuthor] = useState(null);
  const [editingName, setEditingName] = useState("");

  const openEditModal = (author) => {
    setEditingAuthor(author);
    setEditingName(author || "");
  };

  const closeEditModal = () => {
    setEditingAuthor(null);
    setEditingName("");
  };

  if (!authors || authors.length === 0) {
    return (
      <div className="text-center py-20 text-subtitle">
        Belum ada penulis tersedia.
      </div>
    );
  }

  return (
    <>
      <table className="w-full text-center border-collapse">
        {/* Header tabel penulis */}
        <thead>
          <tr className="text-header-table bg-[var(--background_sidebar)]">
            <th className="p-4 w-2/3">NAMA PENULIS</th>
            <th className="p-4 w-1/3">AKSI</th>
          </tr>
        </thead>

        {/* Isi tabel */}
        <tbody>
          {authors.map((author, idx) => (
            <tr
              key={idx}
              className="text-content-table border-b border-[var(--color_text_title)]/30 hover:bg-[var(--background_sidebar)]/30"
            >
              {/* Nama Penulis */}
              <td className="p-4 text-left">{author || "-"}</td>

              {/* Aksi */}
              <td className="p-4 text-center">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  {/* tombol edit */}
                  <button
                    type="button"
                    onClick={() => openEditModal(author)}
                    className="btn-edit"
                  >
                    <i className="ri-edit-2-fill"></i>
                  </button>

                  {/* tombol hapus */}
                  <button
                    type="button"
                    onClick={() => setDeletingAuthor(author)}
                    className="btn-cancel"
                  >
                    <i className="ri-delete-bin-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {editingAuthor && (
        <AuthorEdit
          isOpen={true}
          onClose={closeEditModal}
          author={editingAuthor}
          editingName={editingName}
          setEditingName={setEditingName}
          fetchAuthors={fetchAuthors}
        />
      )}

      {/* Modal Delete */}
      {deletingAuthor && (
        <AuthorDelete
          isOpen={true}
          onClose={() => setDeletingAuthor(null)}
          author={deletingAuthor}
          fetchAuthors={fetchAuthors}
        />
      )}
    </>
  );
};

export default AuthorTable;
