import { API_ENDPOINTS } from "../api/apiconfig";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET COURSES
export const getCourses = async () => {
  const res = await fetch(API_ENDPOINTS.GET_COURSE, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Fetch course failed");
  const json = await res.json();
  console.log("RAW JSON:", json);

  return Array.isArray(json) ? json
       : Array.isArray(json.content) ? json.content  // ✅ Spring Page
       : Array.isArray(json.data) ? json.data
       : [];
};

// ADD COURSE
export const addCourse = async (data) => {
  const res = await fetch(API_ENDPOINTS.POST_COURSE, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Add course failed");
  return await res.json();
};

// DELETE COURSE
export const deleteCourse = async (id) => {
  const res = await fetch(`${API_ENDPOINTS.DELETE_COURSE}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Delete course failed");
};

// UPDATE COURSE
export const updateCourse = async (id, data) => {
  const res = await fetch(`${API_ENDPOINTS.UPDATE_COURSE}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update course failed");
  return await res.json();
};

// TOGGLE STATUS  ✅ new
export const toggleCourseStatus = async (id, status) => {
  const res = await fetch(`${API_ENDPOINTS.GET_COURSE}/${id}/status?status=${status}`, {
    method: "PUT",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Status update failed");
  return await res.json();
};