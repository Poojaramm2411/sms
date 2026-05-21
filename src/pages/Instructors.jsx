import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Instructors.css";
import InstructorModal from "../components/InstructorModal";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ ADD / UPDATE
  const handleSave = (data) => {
    if (editData) {
      setInstructors(
        instructors.map((i) =>
          i.id === editData.id ? { ...data, id: editData.id } : i
        )
      );
    } else {
      setInstructors([
        ...instructors,
        { ...data, id: Date.now(), active: true },
      ]);
    }

    setShowModal(false);
    setEditData(null);
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Delete this instructor?")) return;
    setInstructors(instructors.filter((i) => i.id !== id));
  };

  // ✅ EDIT
  const handleEdit = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  return (
    <div className="instructors-container">
      <div className="instructors-header">
        <h2>Instructors</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          + Add Instructor
        </button>
      </div>

      <div className="table-wrapper">
        <table className="instructors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {instructors.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No Instructors Found
                </td>
              </tr>
            ) : (
              instructors.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.email}</td>
                  <td>{i.specialization}</td>

                  <td>
                    <span
                      className={
                        i.active ? "status active" : "status inactive"
                      }
                    >
                      {i.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <FaEdit
                      className="icon edit"
                      onClick={() => handleEdit(i)}
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleDelete(i.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <InstructorModal
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          onSave={handleSave}
          data={editData}
        />
      )}
    </div>
  );
}