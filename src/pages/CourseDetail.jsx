import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentDetail.css"; // reuse same CSS

export default function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  if (!course) return <h3>No Course Data Found</h3>;

  return (
    <div className="student-detail-container">
      <div className="detail-card">
        <h2>Course Details</h2>

        <div className="detail-row">
          <label>ID:</label>
          <span>{course.id}</span>
        </div>
        <div className="detail-row">
          <label>Course Name:</label>
          <span>{course.courseName}</span>
        </div>
        <div className="detail-row">
          <label>Department:</label>
          <span>{course.department}</span>
        </div>
        <div className="detail-row">
          <label>Duration:</label>
          <span>{course.duration}</span>
        </div>
        <div className="detail-row">
          <label>Status:</label>
          <span className={course.status === "Active" ? "active" : "inactive"}>
            {course.status}
          </span>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}