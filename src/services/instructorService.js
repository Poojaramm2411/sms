import { API_ENDPOINTS } from "../api/apiconfig";

// GET ALL INSTRUCTORS
export async function getInstructors() {
  const response = await fetch(API_ENDPOINTS.GET_INSTRUCTORS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch instructors");
  }

  return result;
}

// GET INSTRUCTOR BY ID
export async function getInstructorById(id) {
  const response = await fetch(API_ENDPOINTS.GET_INSTRUCTOR_BY_ID(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch instructor");
  }

  return result;
}

// ADD INSTRUCTOR
export async function addInstructor(data) {
  const response = await fetch(API_ENDPOINTS.POST_INSTRUCTOR, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Add instructor failed");
  }

  return result;
}

// UPDATE INSTRUCTOR
export async function updateInstructor(id, data) {
  const response = await fetch(API_ENDPOINTS.UPDATE_INSTRUCTOR(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Update instructor failed");
  }

  return result;
}

// DELETE INSTRUCTOR
export async function deleteInstructor(id) {
  const response = await fetch(API_ENDPOINTS.DELETE_INSTRUCTOR(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Delete instructor failed");
  }

  return true;
}