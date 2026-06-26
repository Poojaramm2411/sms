import api from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/apiconfig";

const downloadFile = (data, filename, mimeType) => {
  const url = window.URL.createObjectURL(new Blob([data], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// ── STUDENTS ──
export const exportStudentsPdf = async () => {
  const res = await api.get(API_ENDPOINTS.EXPORT_STUDENT_PDF, { responseType: "blob" });
  downloadFile(res.data, "students.pdf", "application/pdf");
};
export const exportStudentsExcel = async () => {
  const res = await api.get(API_ENDPOINTS.EXPORT_STUDENT_EXCEL, { responseType: "blob" });
  downloadFile(res.data, "students.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};
export const bulkUploadStudents = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(API_ENDPOINTS.BULK_UPLOAD_STUDENT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ── COURSES ──
export const exportCoursesPdf = async () => {
  const res = await api.get(API_ENDPOINTS.EXPORT_COURSE_PDF, { responseType: "blob" });
  downloadFile(res.data, "courses.pdf", "application/pdf");
};
export const exportCoursesExcel = async () => {
  const res = await api.get(API_ENDPOINTS.EXPORT_COURSE_EXCEL, { responseType: "blob" });
  downloadFile(res.data, "courses.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};
export const bulkUploadCourses = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(API_ENDPOINTS.BULK_UPLOAD_COURSE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ── BATCHES ──
export const exportBatchesPdf = async () => {
  const res = await api.get(API_ENDPOINTS.EXPORT_BATCH_PDF, { responseType: "blob" });
  downloadFile(res.data, "batches.pdf", "application/pdf");
};
export const exportBatchesExcel = async () => {
  const res = await api.get(API_ENDPOINTS.EXPORT_BATCH_EXCEL, { responseType: "blob" });
  downloadFile(res.data, "batches.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};
export const bulkUploadBatches = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(API_ENDPOINTS.BULK_UPLOAD_BATCH, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};