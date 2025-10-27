import { useState } from "react";
import SubjectEdit from "./SubjectEdit";
import SubjectDelete from "./SubjectDelete";

const SubjectTable = ({ subjects, fetchSubjects }) => {
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingSubject, setDeletingSubject] = useState(null);
  const [editingName, setEditingName] = useState("");

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setEditingName(subject || "");
  };

  const closeEditModal = () => {
    setEditingSubject(null);
    setEditingName("");
  };

  if (!subjects || subjects.length === 0) {
    return (
      <div className="text-center py-20 text-subtitle">
        Belum ada subjek tersedia.
      </div>
    );
  }

  return (
    <>
      <table className="w-full text-center border-collapse">
        {/* header table */}
        <thead>
          <tr className="text-header-table bg-[var(--background_sidebar)]">
            <th className="p-4 w-2/3">SUBJECT</th>
            <th className="p-4 w-1/3">AKSI</th>
          </tr>
        </thead>

        {/* content table */}
        <tbody>
          {subjects.map((subject, idx) => (
            <tr
              key={idx}
              className="text-content-table border-b border-[var(--color_text_title)]/30 hover:bg-[var(--background_sidebar)]/30"
            >
              {/* SUBJECT */}
              <td className="p-4 text-left">{subject || "-"}</td>

              {/* AKSI */}
              <td className="p-4 text-center">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  {/* tombol edit */}
                  <button
                    type="button"
                    onClick={() => openEditModal(subject)}
                    className="btn-edit"
                  >
                    <i className="ri-edit-2-fill"></i>
                  </button>

                  {/* tombol hapus */}
                  <button
                    type="button"
                    onClick={() => setDeletingSubject(subject)}
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
      {editingSubject && (
        <SubjectEdit
          isOpen={true}
          onClose={closeEditModal}
          subject={editingSubject}
          editingName={editingName}
          setEditingName={setEditingName}
          fetchSubjects={fetchSubjects}
        />
      )}

      {/* Modal Delete */}
      {deletingSubject && (
        <SubjectDelete
          isOpen={true}
          onClose={() => setDeletingSubject(null)}
          subject={deletingSubject}
          fetchSubjects={fetchSubjects}
        />
      )}
    </>
  );
};

export default SubjectTable;
