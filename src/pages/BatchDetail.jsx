import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentDetail.css";

export default function BatchDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const batch = location.state?.batch;

  if (!batch) return <h3>No Batch Data Found</h3>;

  return (
    <div className="student-detail-container">
      <div className="detail-card">
        <h2>Batch Details</h2>

        <div className="detail-row">
          <label>ID:</label>
          <span>{batch.id}</span>
        </div>
        <div className="detail-row">
          <label>Batch Name:</label>
          <span>{batch.batchName}</span>
        </div>
        <div className="detail-row">
          <label>Start Date:</label>
          <span>{batch.startDate}</span>
        </div>
        <div className="detail-row">
          <label>End Date:</label>
          <span>{batch.endDate}</span>
        </div>
        <div className="detail-row">
          <label>Status:</label>
          <span className={batch.status === "Active" ? "active" : "inactive"}>
            {batch.status}
          </span>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}