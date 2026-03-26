import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  // ✅ DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
  };

  // ✅ TOGGLE STATUS
  const toggleStatus = (id) => {
    const updated = courses.map((c) =>
      c.id === id ? { ...c, isActive: !c.isActive } : c
    );
    setCourses(updated);
  };

  // ✅ EDIT
  const handleEdit = (course) => {
    alert(`Editing ${course.courseName}`);
    // later → open modal / navigate to edit page
  };

  return (
    <div className="courses-container">
      {/* HEADER */}
      <div className="courses-header">
        <h2>Courses</h2>
        <button className="add-btn">+ Add Course</button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="courses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No Courses Found
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.courseName}</td>
                  <td>{c.department}</td>
                  <td>{c.duration}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={
                        c.isActive ? "status active" : "status inactive"
                      }
                      onClick={() => toggleStatus(c.id)}
                    >
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* ✅ ACTION ICONS */}
                  <td className="action-buttons">
                    <FaEdit
                      className="icon edit"
                      title="Edit"
                      onClick={() => handleEdit(c)}
                    />

                    <FaTrash
                      className="icon delete"
                      title="Delete"
                      onClick={() => handleDelete(c.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}