import { API_ENDPOINTS } from "../api/apiconfig";

//  COMMON HEADERS (WITH TOKEN)
const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


//  GET ALL BATCHES
export const getBatches = async () => {
  try {
    const res = await fetch(API_ENDPOINTS.GET_BATCH, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`GET BATCH FAILED: ${res.status}`);
    }

    const data = await res.json();
    console.log(" BATCH LIST:", data);

    // Handle paged / normal response
    return data.data || data;

  } catch (error) {
    console.error("❌ GET BATCH ERROR:", error);
    return [];
  }
};


//  GET BATCH BY ID
export const getBatchById = async (id) => {
  try {
    const res = await fetch(API_ENDPOINTS.GET_BATCH_BY_ID(id), {
      method: "GET",
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`GET BY ID FAILED: ${res.status}`);
    }

    const data = await res.json();
    console.log(" SINGLE BATCH:", data);

    return data;

  } catch (error) {
    console.error(" GET BY ID ERROR:", error);
    return null;
  }
};


//  CREATE BATCH
export const createBatch = async (batchData) => {
  try {
    const res = await fetch(API_ENDPOINTS.POST_BATCH, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(batchData),
    });

    if (!res.ok) {
      throw new Error(`CREATE FAILED: ${res.status}`);
    }

    const data = await res.json();
    console.log(" BATCH CREATED:", data);

    return data;

  } catch (error) {
    console.error(" CREATE ERROR:", error);
    return null;
  }
};


// UPDATE BATCH
export const updateBatch = async (id, batchData) => {
  try {
    const res = await fetch(API_ENDPOINTS.UPDATE_BATCH(id), {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(batchData),
    });

    if (!res.ok) {
      throw new Error(`UPDATE FAILED: ${res.status}`);
    }

    const data = await res.json();
    console.log(" BATCH UPDATED:", data);

    return data;

  } catch (error) {
    console.error(" UPDATE ERROR:", error);
    return null;
  }
};


// ✅ DELETE BATCH
export const deleteBatch = async (id) => {
  try {
    const res = await fetch(API_ENDPOINTS.DELETE_BATCH(id), {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`DELETE FAILED: ${res.status}`);
    }

    console.log("✅ BATCH DELETED");

    return true;

  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    return false;
  }
};