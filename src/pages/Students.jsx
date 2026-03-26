import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Students.css";
import "../styles/StudentModal.css";
import StudentModal from "../components/StudentModal";
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../services/studentService";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getStudents()
      .then((data) => { if (!cancelled) setStudents(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setStudents([]); });
    return () => { cancelled = true; };
  }, []);

  const fetchStudents = () => {
    getStudents()
    
    
      .then((data) => setStudents(Array.isArray(data) ? data : []))
      .catch(() => setStudents([]));
      
  };

  // ✅ ADD / UPDATE
  const handleSaveStudent = async (student) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, student);
      } else {
        await addStudent(student);
      }

      fetchStudents();
      setShowModal(false);
      setSelectedStudent(null);
      setViewMode(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ VIEW
  const handleView = (stu) => {
    setSelectedStudent(stu);
    setViewMode(true);
    setShowModal(true);
  };

  // ✅ EDIT
  const handleEdit = (stu) => {
    setSelectedStudent(stu);
    setViewMode(false);
    setShowModal(true);
  };

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Students</h2>
        <button
          className="add-btn"
          onClick={() => {
            setSelectedStudent(null);
            setShowModal(true);
          }}
        >
          + Add Student
        </button>
      </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No Students Found
                </td>
              </tr>
            ) : (
              students.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.id}</td>
                  <td>{stu.name}</td>
                  <td>{stu.email}</td>
                  <td>{stu.birthDate}</td>
                  <td>{stu.city}</td>

                  <td>
                    <span
                      className={
                        stu.isActive ? "status active" : "status inactive"
                      }
                    >
                      {stu.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <FaEye
                      className="icon view"
                      onClick={() => handleView(stu)}
                    />
                    <FaEdit
                      className="icon edit"
                      onClick={() => handleEdit(stu)}
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleDelete(stu.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <StudentModal
          onClose={() => {
            setShowModal(false);
            setSelectedStudent(null);
            setViewMode(false);
          }}
          onSave={handleSaveStudent}
          student={selectedStudent}
          viewMode={viewMode}
        />
      )}
    </div>
  );
}