import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const navigate = useNavigate();

  const fetchStudents = async () => {
    setIsLoading(true);
    setFetchError("");

    try {
      const data = await getStudents();

      console.log("FINAL STUDENTS:", data); // 🔥 DEBUG

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setStudents([]);
      setFetchError("Unable to load students. Please check your network or login token.");
    } finally {
      setIsLoading(false);
    }
  };

  //  CALL AFTER DEFINITION
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStudents();
  }, []);

  //  ADD / UPDATE
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

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  //  VIEW
  const handleView = (stu) => {
    navigate("/student-detail", { state: { student: stu } });
  };

  //  EDIT
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
              <th>Age</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="no-data">
                  Loading students...
                </td>
              </tr>
            ) : fetchError ? (
              <tr>
                <td colSpan="7" className="no-data">
                  {fetchError}
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No Students Found
                </td>
              </tr>
            ) : (
              students.map((stu, index) => (
                <tr key={stu.id || stu.studentId || index}>
                  <td>{stu.id || stu.studentId || "-"}</td>
                  <td>{stu.name || "-"}</td>
                  <td>{stu.email || "-"}</td>
                  <td>{stu.age || "-"}</td>
                  <td>{stu.studentCode || "-"}</td>

                  <td>
                    <span
                      className={
                        stu.isActive
                          ? "status active"
                          : "status inactive"
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
                      onClick={() =>
                        handleDelete(stu.id || stu.studentId)
                      }
                    />
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DEBUG (use if needed) */}
      {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}

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