import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiSearch, FiUpload, FiDownload } from "react-icons/fi";
import { fetchStudents, addStudent, editStudent, removeStudent, toggleStudent } from "../../store/Slices/studentSlice";
import { fetchBatches } from "../../store/Slices/batchSlice";
import { exportStudentsPdf, exportStudentsExcel, bulkUploadStudents } from "../../services/exportService";
import StudentModal from "../../components/modals/StudentModal";
import StatusBadge from "../../components/ui/StatusBadge";
import Pagination from "../../components/ui/Pagination";
import { usePagination } from "../../hooks/usePagination";
import "../../styles/Table.css";

export default function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPages, totalElements, currentPage, loading } = useSelector((s) => s.students);
  const { items: batches } = useSelector((s) => s.batches);

  const { page, size, goToPage, reset } = usePagination();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents({ page, size, search }));
  }, [dispatch, page, size, search]);

  useEffect(() => {
    dispatch(fetchBatches({ page: 0, size: 100 }));
  }, [dispatch]);

  const handleSearch = (e) => { setSearch(e.target.value); reset(); };

  const handleSave = async (data) => {
    let result;
    if (editData) {
      result = await dispatch(editStudent({ id: editData.id, data }));
      if (editStudent.fulfilled.match(result)) toast.success("Student updated!");
      else toast.error(result.payload);
    } else {
      result = await dispatch(addStudent(data));
      if (addStudent.fulfilled.match(result)) toast.success("Student added!");
      else toast.error(result.payload);
    }
    setModalOpen(false);
    setEditData(null);
    dispatch(fetchStudents({ page, size, search }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    const result = await dispatch(removeStudent(id));
    if (removeStudent.fulfilled.match(result)) toast.success("Student deleted");
    else toast.error(result.payload);
    dispatch(fetchStudents({ page, size, search }));
  };

  const handleToggle = async (id) => {
    await dispatch(toggleStudent(id));
    dispatch(fetchStudents({ page, size, search }));
  };
  const fileInputRef = useRef();
const [uploading, setUploading] = useState(false);

const handleBulkUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploading(true);
  try {
    const result = await bulkUploadStudents(file);
    toast.success(`Uploaded: ${result.success} success, ${result.failed} failed`);
    if (result.errors?.length > 0) result.errors.forEach(err => toast.warning(err));
    dispatch(fetchStudents({ page, size, search }));
  } catch {
    toast.error("Bulk upload failed");
  } finally {
    setUploading(false);
    e.target.value = "";
  }
};

const handleExportPdf = async () => {
  try { await exportStudentsPdf(); toast.success("PDF downloaded!"); }
  catch { toast.error("Export failed"); }
};

const handleExportExcel = async () => {
  try { await exportStudentsExcel(); toast.success("Excel downloaded!"); }
  catch { toast.error("Export failed"); }
};

  return (
    <div className="fade-in">
      <div className="page-header">
  <div>
    <h1 className="page-title">Students</h1>
    <p className="page-subtitle">{totalElements} total students</p>
  </div>
  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
    {/* Hidden file input */}
    <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleBulkUpload} />

    {/* import */}
    <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()} disabled={uploading}>
      <FiUpload /> {uploading ? "Uploading..." : "Import PDF"}
    </button>

    {/* Export PDF */}
    <button className="btn btn-secondary" onClick={handleExportPdf}>
      <FiDownload /> Export PDF
    </button>

    {/* Export Excel */}
    <button className="btn btn-secondary" onClick={handleExportExcel}>
      <FiDownload /> Export Excel
    </button>

    {/* Add Student */}
    <button className="btn btn-primary" onClick={() => { setEditData(null); setModalOpen(true); }}>
      <FiPlus /> Add Student
    </button>
  </div>
</div>
      <div className="toolbar">
        <div className="search-wrap">
          <FiSearch />
          <input className="search-input" placeholder="Search by name, email, code..." value={search} onChange={handleSearch} />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Student Code</th>
              <th>Batch</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>No students found</td></tr>
            ) : items.map((s, i) => (
              <tr key={s.id}>
                <td className="cell-id">{page * size + i + 1}</td>
                <td className="cell-name">{s.name}</td>
                <td className="cell-email">{s.email}</td>
                <td>{s.age || "—"}</td>
                <td><span className="cell-code">{s.studentCode}</span></td>
                <td>{s.batchName || "—"}</td>
                <td>{s.city || "—"}</td>
                <td><StatusBadge status={s.status} onClick={() => handleToggle(s.id)} /></td>
                <td>
                  <div className="action-cell">
                    <button className="action-btn action-btn-view" onClick={() => navigate("/students/" + s.id, { state: { student: s } })} title="View"><FiEye /></button>
                    <button className="action-btn action-btn-edit" onClick={() => { setEditData(s); setModalOpen(true); }} title="Edit"><FiEdit2 /></button>
                    <button className="action-btn action-btn-delete" onClick={() => handleDelete(s.id)} title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} totalElements={totalElements} size={size} onPageChange={goToPage} />
      </div>

      <StudentModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditData(null); }} onSave={handleSave} editData={editData} batches={batches} />
    </div>
  );
}