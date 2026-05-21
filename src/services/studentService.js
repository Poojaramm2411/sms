 import { API_ENDPOINTS } from "../api/apiconfig";

// COMMON HEADERS WITH TOKEN
const getHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// 🔹 GET STUDENTS
export const getStudents = async () => {
  const res = await fetch(API_ENDPOINTS.GET_STUDENT, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Fetch students failed");

  const json = await res.json();

  return Array.isArray(json)
    ? json
    : Array.isArray(json.content)
    ? json.content        // ✅ THIS FIXES IT
    : Array.isArray(json.data)
    ? json.data
    : [];
};

// 🔹 ADD STUDENT
export const addStudent = async (data) => {
  const res = await fetch(API_ENDPOINTS.POST_STUDENT, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Add student failed");

  return await res.json();
};

// 🔹 DELETE STUDENT
export const deleteStudent = async (id) => {
  const res = await fetch(API_ENDPOINTS.DELETE_STUDENT(id), {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Delete student failed");
};

// 🔹 UPDATE STUDENT
export const updateStudent = async (id, data) => {
  const res = await fetch(API_ENDPOINTS.UPDATE_STUDENT(id), {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update student failed");

  return await res.json();
};