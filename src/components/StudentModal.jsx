import { useState } from "react";
import "../styles/StudentModal.css";

export default function StudentModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...form,
      isActive: true,
    };

    onSave(newStudent);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Add Student</h3>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input type="date" name="birthDate" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="state" placeholder="State" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />

          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}