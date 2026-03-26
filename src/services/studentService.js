import { API_ENDPOINTS } from "../api/apiconfig";

// ✅ COMMON HEADERS WITH TOKEN
const getHeaders = () => {
  const token = localStorage.getItem("token");
console.log("TOKEN:", token);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ FIX
  };
};

// ✅ GET
export const getStudents = async () => {
  const res = await fetch(API_ENDPOINTS.GET_STUDENT, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Fetch failed");
  const json = await res.json();
  // handle both: direct array or wrapped { data: [...] }
  return Array.isArray(json) ? json : (Array.isArray(json.data) ? json.data : []);
};

// ✅ ADD
export const addStudent = async (data) => {
  const res = await fetch(API_ENDPOINTS.POST_STUDENT, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Add failed");
  return await res.json();
};

// ✅ DELETE
export const deleteStudent = async (id) => {
  const res = await fetch(`${API_ENDPOINTS.DELETE_STUDENT}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Delete failed");
};

// ✅ UPDATE
export const updateStudent = async (id, data) => {
  const res = await fetch(`${API_ENDPOINTS.UPDATE_STUDENT}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");
  return await res.json();
};