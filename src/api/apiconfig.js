export const BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
  // ADMIN
  LOGIN:        `${BASE_URL}/api/admin/login`,
  REGISTER:     `${BASE_URL}/api/admin/register`,
  GET_ADMIN:    (email) => `${BASE_URL}/api/admin/get/${email}`,
  UPDATE_ADMIN: (email) => `${BASE_URL}/api/admin/update/${email}`,
  DELETE_ADMIN: (email) => `${BASE_URL}/api/admin/delete/${email}`,

  // STUDENT
  GET_STUDENT:       `${BASE_URL}/api/students`,
  GET_STUDENT_BY_ID: (id) => `${BASE_URL}/api/students/${id}`,
  POST_STUDENT:      `${BASE_URL}/api/students`,
  UPDATE_STUDENT:    (id) => `${BASE_URL}/api/students/${id}`,
  DELETE_STUDENT:    (id) => `${BASE_URL}/api/students/${id}`,
  TOGGLE_STUDENT:    (id) => `${BASE_URL}/api/students/${id}/status`,

  // COURSE
  GET_COURSE:       `${BASE_URL}/api/courses`,
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/api/courses/${id}`,
  POST_COURSE:      `${BASE_URL}/api/courses`,
  UPDATE_COURSE:    (id) => `${BASE_URL}/api/courses/${id}`,
  DELETE_COURSE:    (id) => `${BASE_URL}/api/courses/${id}`,
  TOGGLE_COURSE:    (id) => `${BASE_URL}/api/courses/${id}/status`,

  // BATCH
  GET_BATCH:       `${BASE_URL}/api/batches`,
  GET_BATCH_BY_ID: (id) => `${BASE_URL}/api/batches/${id}`,
  POST_BATCH:      `${BASE_URL}/api/batches`,
  UPDATE_BATCH:    (id) => `${BASE_URL}/api/batches/${id}`,
  DELETE_BATCH:    (id) => `${BASE_URL}/api/batches/${id}`,
  TOGGLE_BATCH:    (id) => `${BASE_URL}/api/batches/${id}/status`,

  // INSTRUCTORS
  GET_INSTRUCTORS:      `${BASE_URL}/api/instructors`,
  GET_INSTRUCTOR_BY_ID: (id) => `${BASE_URL}/api/instructors/${id}`,
  POST_INSTRUCTOR:      `${BASE_URL}/api/instructors`,
  UPDATE_INSTRUCTOR:    (id) => `${BASE_URL}/api/instructors/${id}`,
  DELETE_INSTRUCTOR:    (id) => `${BASE_URL}/api/instructors/${id}`,
  TOGGLE_INSTRUCTOR:    (id) => `${BASE_URL}/api/instructors/${id}/status`,
};