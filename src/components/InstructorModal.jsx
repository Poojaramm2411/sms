import { useState,  } from "react";
import "../styles/StudentModal.css"; // same CSS

export default function InstructorModal({ onClose, onSave, data }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
  });

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.specialization) {
      alert("Please fill all fields");
      return;
    }
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{data ? "Edit Instructor" : "Add Instructor"}</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Instructor Name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Specialization</label>
        <input
          type="text"
          name="specialization"
          placeholder="Enter Specialization"
          value={form.specialization}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}