import { useState } from "react";
import "../styles/BatchModal.css";

export default function BatchModal({ isOpen, onClose, onSave, editData }) {
  const emptyForm = {
    name: "",
    course: "",
    startDate: "",
  };

  const [form, setForm] = useState(emptyForm);

  // 👉 Decide what to show (NO setState here)
  const displayData = editData || form;

  const handleChange = (e) => {
    setForm({ ...displayData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(displayData);
    setForm(emptyForm); // reset
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{editData ? "Edit Batch" : "Add Batch"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Batch Name"
            value={displayData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course Name"
            value={displayData.course}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="startDate"
            value={displayData.startDate}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Save
            </button>

            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}