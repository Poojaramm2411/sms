import { useState, useEffect } from "react";
import "../styles/Courses.css";

function CourseModal({ isOpen, onClose, onSave, editData }) {
  const [course, setCourse] = useState({
    courseName: "",
    department: "",
    duration: "",
    
  });

  // Load edit data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editData && typeof editData === "object") {
        setCourse({
          courseName: editData.courseName || "",
          department: editData.department || "",
          duration: editData.duration || "",
        });
      } else {
        setCourse({ courseName: "", department: "", duration: "" });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [editData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(course);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{editData ? "Edit Course" : "Add Course"}</h2>

        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={course.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            placeholder="e.g. 3 Months"
          />
        </div>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn save" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
