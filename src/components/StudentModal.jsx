import { useState } from "react";
import "../styles/StudentModal.css";

export default function StudentModal({ onClose, onSave, student, viewMode }) {
  const [form, setForm] = useState({
    name: student?.name || "",
    email: student?.email || "",
    age: student?.age || "",
    studentCode: student?.studentCode || "",
    birthDate: student?.birthDate || "",
    address: student?.address || "",
    city: student?.city || "",
    state: student?.state || "",
    country: student?.country || "",
    pincode: student?.pincode || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ CORRECT — just pass form data, let backend generate ID
    const studentData = {
      ...form,
      isActive: true,
    };

    onSave(studentData); // this calls addStudent(student) in Students.jsx
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{student ? (viewMode ? "View Student" : "Edit Student") : "Add Student"}</h3>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name}
            onChange={handleChange} required disabled={viewMode} />
          <input name="email" placeholder="Email" value={form.email}
            onChange={handleChange} required disabled={viewMode} />
          <input name="age" placeholder="Age" type="number" value={form.age}
            onChange={handleChange} disabled={viewMode} />
          <input name="studentCode" placeholder="Student Code" value={form.studentCode}
            onChange={handleChange} disabled={viewMode} />
          <input type="date" name="birthDate" value={form.birthDate}
            onChange={handleChange} disabled={viewMode} />
          <input name="address" placeholder="Address" value={form.address}
            onChange={handleChange} disabled={viewMode} />
          <input name="city" placeholder="City" value={form.city}
            onChange={handleChange} disabled={viewMode} />
          <input name="state" placeholder="State" value={form.state}
            onChange={handleChange} disabled={viewMode} />
          <input name="country" placeholder="Country" value={form.country}
            onChange={handleChange} disabled={viewMode} />
          <input name="pincode" placeholder="Pincode" value={form.pincode}
            onChange={handleChange} disabled={viewMode} />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            {!viewMode && <button type="submit">Save</button>}
          </div>
        </form>
      </div>
    </div>
  );
}