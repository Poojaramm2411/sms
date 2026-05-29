import { useState, useEffect } from "react";
import "../styles/BatchModal.css";

export default function BatchModal({ isOpen, onClose, onSave, editData }) {
  const [form, setForm] = useState({
    batchName: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        batchName: editData.batchName || "",
        startDate: editData.startDate || "",
        endDate: editData.endDate || "",
        status: editData.status || "",
      });
    } else {
      setForm({ batchName: "", startDate: "", endDate: "", status: "" });
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{editData ? "Edit Batch" : "Add Batch"}</h2>

        <form onSubmit={handleSubmit}>

          {/* Batch Code - show only when editing */}
          {editData && (
            <div className="form-group">
              <label>Batch Code</label>
              <input
                type="text"
                value={editData.batchCode || ""}
                readOnly
                className="readonly-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>Batch Name</label>
            <input
              type="text"
              name="batchName"
              placeholder="Enter batch name"
              value={form.batchName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange} required>
              <option value="">-- Select Status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}