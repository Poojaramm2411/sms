import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Batches.css";
import BatchModal from "../components/BatchModal";

import {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
} from "../services/batchService";

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchBatches = async (page = 0) => {
    setIsLoading(true);
    setFetchError("");
    try {
      const data = await getBatches(page, 10);
      setBatches(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setCurrentPage(data.currentPage || 0);
    } catch (err) {
      setBatches([]);
      setFetchError("Unable to load batches.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchBatches(0); }, []);

  const handleSave = async (batch) => {
    try {
      if (editData) {
        await updateBatch(editData.id, batch);
      } else {
        await createBatch(batch);
      }
      fetchBatches(currentPage);
      setIsModalOpen(false);
      setEditData(null);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await deleteBatch(id);
      fetchBatches(currentPage);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await toggleBatchStatus(id, newStatus);
      fetchBatches(currentPage);
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handlePageChange = (page) => {
    fetchBatches(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];

    pages.push(
      <button key="prev"
        className={`page-btn ${currentPage === 0 ? "disabled" : ""}`}
        onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}>
        &lt; Prev
      </button>
    );

    for (let i = 0; i < totalPages; i++) {
      if (i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <button key={i}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}>
            {i + 1}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={`dots-${i}`} className="page-dots">...</span>);
      }
    }

    pages.push(
      <button key="next"
        className={`page-btn ${currentPage === totalPages - 1 ? "disabled" : ""}`}
        onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}>
        Next &gt;
      </button>
    );

    return pages;
  };

  return (
    <div className="batches-container">
      <div className="batches-header">
        <h2>Batches</h2>
        <button className="add-btn" onClick={() => { setEditData(null); setIsModalOpen(true); }}>
          + Add Batch
        </button>
      </div>

      <div className="table-wrapper">
        <table className="batches-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Batch Name</th>
              <th>Start Date</th>
              <th>End Date</th> 
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7" className="no-data">Loading batches...</td></tr>
            ) : fetchError ? (
              <tr><td colSpan="7" className="no-data">{fetchError}</td></tr>
            ) : batches.length === 0 ? (
              <tr><td colSpan="7" className="no-data">No Batches Found</td></tr>
            ) : (
              batches.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.batchName}</td>       
                  <td>{b.startDate}</td>
                  <td>{b.endDate}</td>
                  <td>
                    <span
                      className={b.status === "Active" ? "status active" : "status inactive"}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleToggleStatus(b.id, b.status)}
                      title="Click to toggle status"
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <FaEye className="icon view"
                      onClick={() => navigate("/batch-detail", { state: { batch: b } })} />  {/* ✅ added */}
                    <FaEdit className="icon edit"
                      onClick={() => { setEditData(b); setIsModalOpen(true); }} />
                    <FaTrash className="icon delete"
                      onClick={() => handleDelete(b.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <div className="pagination-container">
          <span className="pagination-info">
            Showing {currentPage * 10 + 1} - {Math.min((currentPage + 1) * 10, totalElements)} of {totalElements} batches
          </span>
          <div className="pagination-buttons">
            {renderPagination()}
          </div>
        </div>
      )}

      <BatchModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}