import { API_ENDPOINTS } from "../api/apiconfig";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

// GET ALL STUDENTS
export const getStudents = async () => {
  const res = await fetch(API_ENDPOINTS.GET_STUDENT, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Fetch students failed");
  const json = await res.json();
  return Array.isArray(json) ? json
       : Array.isArray(json.content) ? json.content
       : Array.isArray(json.data) ? json.data
       : [];
};

// ADD STUDENT
export const addStudent = async (data) => {
  const res = await fetch(API_ENDPOINTS.POST_STUDENT, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Add student failed");
  return await res.json();
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
  const res = await fetch(API_ENDPOINTS.DELETE_STUDENT(id), {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Delete student failed");
};

// UPDATE STUDENT
export const updateStudent = async (id, data) => {
  const res = await fetch(API_ENDPOINTS.UPDATE_STUDENT(id), {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update student failed");
  return await res.json();
};

// TOGGLE STATUS
export const toggleStudentStatus = async (id) => {
  const res = await fetch(`${API_ENDPOINTS.GET_STUDENT}/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Toggle status failed");
  return await res.json();
};

// SEARCH STUDENTS
export const searchStudents = async (query) => {
  const res = await fetch(
    `${API_ENDPOINTS.GET_STUDENT}/search?search=${encodeURIComponent(query)}&size=100`,
    { method: "GET", headers: getHeaders() }
  );
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  return Array.isArray(json) ? json
       : Array.isArray(json.content) ? json.content
       : [];
};

// ✅ EXPORT EXCEL
export const exportStudents = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_ENDPOINTS.GET_STUDENT}/export`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Export failed");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.xlsx";  // ✅ xlsx
  a.click();
  window.URL.revokeObjectURL(url);
};

// ✅ DOWNLOAD TEMPLATE
export const downloadTemplate = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_ENDPOINTS.GET_STUDENT}/template`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Template download failed");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students_template.xlsx";
  a.click();
  window.URL.revokeObjectURL(url);
};

// ✅ IMPORT EXCEL
export const importStudents = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_ENDPOINTS.GET_STUDENT}/import`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Import failed");
  return await res.text();
};