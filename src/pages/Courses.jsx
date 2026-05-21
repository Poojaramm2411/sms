import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/Courses.css";
import CourseModal from "../components/CourseModal";

import {
  getCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} from "../services/courseService";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  //  LOAD COURSES FROM API
  

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      console.log("COURSES:", data);
      setCourses(data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourses();
  }, []);

  //  ADD / UPDATE
  const handleSave = async (course) => {
    try {
      if (editData) {
        await updateCourse(editData.id, course);
      } else {
        await addCourse(course);
      }

      fetchCourses(); // refresh table
      setIsModalOpen(false);
      setEditData(null);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  //  DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h2>Courses</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Course
        </button>
      </div>

      <div className="table-wrapper">
        <table className="courses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No Courses Found
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.coursename}</td> {/*  from backend */}
                  <td>{c.department}</td>
                  <td>{c.duration}</td>

                  <td>
                    <span
                      className={
                        c.active ? "status active" : "status inactive"
                      }
                    >
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <FaEdit
                      className="icon edit"
                      onClick={() => {
                        setEditData(c);
                        setIsModalOpen(true);
                      }}
                    />
                    <FaTrash
                      className="icon delete"
                      onClick={() => handleDelete(c.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}