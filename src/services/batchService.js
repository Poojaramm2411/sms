import { API_ENDPOINTS } from "../api/apiconfig";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ✅ GET BATCHES WITH PAGINATION
export const getBatches = async (page = 0, size = 10) => {
  const res = await fetch(
    `${API_ENDPOINTS.GET_BATCH}?page=${page}&size=${size}`,
    { method: "GET", headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`GET BATCH FAILED: ${res.status}`);
  const json = await res.json();
  return {
    content: Array.isArray(json.content) ? json.content : [],
    totalPages: json.totalPages || 0,
    totalElements: json.totalElements || 0,
    currentPage: json.number || 0,
  };
};

// GET BATCH BY ID
export const getBatchById = async (id) => {
  const res = await fetch(API_ENDPOINTS.GET_BATCH_BY_ID(id), {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`GET BY ID FAILED: ${res.status}`);
  return await res.json();
};

// CREATE BATCH
export const createBatch = async (data) => {
  const res = await fetch(API_ENDPOINTS.POST_BATCH, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`CREATE FAILED: ${res.status}`);
  return await res.json();
};

// UPDATE BATCH
export const updateBatch = async (id, data) => {
  const res = await fetch(API_ENDPOINTS.UPDATE_BATCH(id), {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`UPDATE FAILED: ${res.status}`);
  return await res.json();
};

// DELETE BATCH
export const deleteBatch = async (id) => {
  const res = await fetch(API_ENDPOINTS.DELETE_BATCH(id), {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`DELETE FAILED: ${res.status}`);
};

// TOGGLE STATUS
export const toggleBatchStatus = async (id, status) => {
  const res = await fetch(`${API_ENDPOINTS.GET_BATCH}/${id}/status?status=${status}`, {
    method: "PUT",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Status update failed");
  return await res.json();
};