import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch, FaUpload, FaDownload } from "react-icons/fa";
import "../styles/Students.css";
import "../styles/StudentModal.css";
import StudentModal from "../components/StudentModal";

import {
  getStudents, addStudent, deleteStudent,
  updateStudent, toggleStudentStatus,
  searchStudents, exportStudents,
  importStudents, downloadTemplate,
} from "../services/studentService";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const fetchStudents = async (page = 0) => {
    setIsLoading(true);
    setFetchError("");
    try {
      const data = await getStudents(page, 10);
      setStudents(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setStudents([]);
      setFetchError("Unable to load students.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchStudents(0); }, []);

  // ✅ Search with pagination
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(0);
    if (query.trim() === "") { fetchStudents(0); return; }
    try {
      setIsLoading(true);
      const data = await searchStudents(query, 0, 10);
      setStudents(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setCurrentPage(0);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Page change handler
  const handlePageChange = async (page) => {
    if (searchQuery.trim()) {
      const data = await searchStudents(searchQuery, page, 10);
      setStudents(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } else {
      fetchStudents(page);
    }
  };

  const handleExport = async () => {
    try { await exportStudents(); }
    catch (err) { alert("Export failed!"); }
  };

  const handleDownloadTemplate = async () => {
    try { await downloadTemplate(); }
    catch (err) { alert("Template download failed!"); }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleImportUpload = async () => {
    if (!selectedFile) { alert("Please select a file first!"); return; }
    setImporting(true);
    try {
      const result = await importStudents(selectedFile);
      alert(result);
      setShowImportModal(false);
      setSelectedFile(null);
      fetchStudents(0);
    } catch (err) {
      alert("Import failed!");
    } finally {
      setImporting(false);
    }
  };

  const handleSaveStudent = async (student) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, student);
      } else {
        await addStudent(student);
      }
      fetchStudents(currentPage);
      setShowModal(false);
      setSelectedStudent(null);
      setViewMode(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      fetchStudents(currentPage);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleStudentStatus(id);
      fetchStudents(currentPage);
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // ✅ Pagination buttons generator
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`page-btn ${currentPage === 0 ? "disabled" : ""}`}
        onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        &lt; Prev
      </button>
    );

    // Page numbers
    for (let i = 0; i < totalPages; i++) {
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={`dots-${i}`} className="page-dots">...</span>);
      }
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`page-btn ${currentPage === totalPages - 1 ? "disabled" : ""}`}
        onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next &gt;
      </button>
    );

    return pages;
  };

  return (
    <div className="students-container">

      {/* HEADER */}
      <div className="students-header">
        <h2>Students</h2>
        <div className="header-actions">
          <button className="upload-btn" onClick={() => setShowImportModal(true)}>
            <FaUpload /> Upload
          </button>
          <button className="download-btn" onClick={handleExport}>
            <FaDownload /> Download
          </button>
          <button className="add-btn" onClick={() => { setSelectedStudent(null); setShowModal(true); }}>
            + Add Student
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by ID, Name, Email, City..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th>
              <th>Age</th><th>Student Code</th>
              <th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7" className="no-data">Loading students...</td></tr>
            ) : fetchError ? (
              <tr><td colSpan="7" className="no-data">{fetchError}</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan="7" className="no-data">No Students Found</td></tr>
            ) : (
              students.map((stu, index) => (
                <tr key={stu.id || index}>
                  <td>{stu.id || "-"}</td>
                  <td>{stu.name || "-"}</td>
                  <td>{stu.email || "-"}</td>
                  <td>{stu.age || "-"}</td>
                  <td>{stu.studentCode || "-"}</td>
                  <td>
                    <div
                      className={`toggle-switch ${stu.isActive ? "on" : "off"}`}
                      onClick={() => handleToggleStatus(stu.id)}
                      title="Click to toggle status"
                    >
                      <div className="toggle-knob"></div>
                      <span className="toggle-label">
                        {stu.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="action-buttons">
                    <FaEye className="icon view" onClick={() => navigate("/student-detail", { state: { student: stu } })} />
                    <FaEdit className="icon edit" onClick={() => { setSelectedStudent(stu); setShowModal(true); }} />
                    <FaTrash className="icon delete" onClick={() => handleDelete(stu.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <div className="pagination-container">
          <span className="pagination-info">
            Showing {currentPage * 10 + 1} - {Math.min((currentPage + 1) * 10, totalElements)} of {totalElements} students
          </span>
          <div className="pagination-buttons">
            {renderPagination()}
          </div>
        </div>
      )}

      {/* IMPORT MODAL */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="import-modal">
            <h2>Upload Students</h2>
            <div className="import-step">
              <h4>Step 1: Download Template</h4>
              <p>Download the Excel template and fill in student data.</p>
              <button className="template-btn" onClick={handleDownloadTemplate}>
                <FaDownload /> Download Template
              </button>
            </div>
            <hr />
            <div className="import-step">
              <h4>Step 2: Upload Filled Excel File</h4>
              <p>Select the filled Excel file (.xlsx) to import students.</p>
              <div className="file-drop-area" onClick={() => fileInputRef.current.click()}>
                <FaUpload className="upload-icon" />
                <p>{selectedFile ? selectedFile.name : "Click to select Excel file"}</p>
                <span>.xlsx files only</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="import-modal-actions">
              <button className="btn cancel"
                onClick={() => { setShowImportModal(false); setSelectedFile(null); }}>
                Cancel
              </button>
              <button className="btn save"
                onClick={handleImportUpload}
                disabled={!selectedFile || importing}>
                {importing ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <StudentModal
          onClose={() => { setShowModal(false); setSelectedStudent(null); setViewMode(false); }}
          onSave={handleSaveStudent}
          student={selectedStudent}
          viewMode={viewMode}
        />
      )}
    </div>
  );
}