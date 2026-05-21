import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Batches.css";
import BatchModal from "../components/BatchModal";

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ SAVE
  const handleSave = (batch) => {
    if (editData) {
      setBatches(
        batches.map((b) =>
          b.id === editData.id ? { ...batch, id: editData.id } : b
        )
      );
    } else {
      setBatches([
        ...batches,
        {
          ...batch,
          id: Date.now(),
        },
      ]);
    }
    setEditData(null);
  };

  // ✅ EDIT
  const handleEdit = (batch) => {
    setEditData(batch);
    setIsModalOpen(true);
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    setBatches(batches.filter((b) => b.id !== id));
  };

  return (
    <div className="batches-container">
      {/* HEADER */}
      <div className="batches-header">
        <h2>Batches</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Batch
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="batches-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Batch Number</th>
              <th>Batch Code</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {batches.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No Batches Found
                </td>
              </tr>
            ) : (
              batches.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.batchNumber}</td>
                  <td>{b.batchCode}</td>
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>
                  <td className="action-buttons">
                    <FaEdit
                      className="icon edit"
                      onClick={() => handleEdit(b)}
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleDelete(b.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <BatchModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}