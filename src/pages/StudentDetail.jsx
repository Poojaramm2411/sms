import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentDetail.css";

export default function StudentDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state?.student;

  if (!student) {
    return <h3>No Student Data Found</h3>;
  }

  return (
    <div className="student-detail-container">
      <div className="detail-card">
        <h2>Student Details</h2>

        <div className="detail-row">
          <label>ID:</label>
          <span>{student.id}</span>
        </div>

        <div className="detail-row">
          <label>Name:</label>
          <span>{student.name}</span>
        </div>

        <div className="detail-row">
          <label>Email:</label>
          <span>{student.email}</span>
        </div>

        <div className="detail-row">
          <label>Age:</label>
          <span>{student.age}</span>
        </div>

        <div className="detail-row">
          <label>Student Code:</label>
          <span>{student.studentCode}</span>
        </div>

        <div className="detail-row">
          <label>Status:</label>
          <span className={student.isActive ? "active" : "inactive"}>
            {student.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}