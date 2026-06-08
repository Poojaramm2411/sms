import { API_ENDPOINTS } from "../api/apiconfig";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getBatches = async (page = 0, size = 10, search = "", status = "") => {
  let url = `${API_ENDPOINTS.GET_BATCH}?page=${page}&size=${size}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (status) url += `&status=${status}`;
  const res = await fetch(url, { method: "GET", headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch batches: ${res.status}`);
  const json = await res.json();
  return {
    content: Array.isArray(json.content) ? json.content : [],
    totalPages: json.totalPages || 0,
    totalElements: json.totalElements || 0,
    currentPage: json.number || 0,
  };
};

export const getBatchById = async (id) => {
  const res = await fetch(API_ENDPOINTS.GET_BATCH_BY_ID(id), { method: "GET", headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch batch: ${res.status}`);
  return await res.json();
};

export const createBatch = async (data) => {
  const res = await fetch(API_ENDPOINTS.POST_BATCH, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create batch: ${res.status}`);
  return await res.json();
};

export const updateBatch = async (id, data) => {
  const res = await fetch(API_ENDPOINTS.UPDATE_BATCH(id), {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update batch: ${res.status}`);
  return await res.json();
};

export const deleteBatch = async (id) => {
  const res = await fetch(API_ENDPOINTS.DELETE_BATCH(id), { method: "DELETE", headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to delete batch: ${res.status}`);
};

export const toggleBatchStatus = async (id) => {
  const res = await fetch(API_ENDPOINTS.TOGGLE_BATCH(id), { method: "PATCH", headers: getHeaders() });
  if (!res.ok) throw new Error("Status toggle failed");
  return await res.json();
};