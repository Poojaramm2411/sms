import { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ram Kumar", email: "ram@gmail.com", course: "React", age: 22 },
    { id: 2, name: "Arun", email: "arun@gmail.com", course: "Java", age: 23 },
    { id: 3, name: "Priya", email: "priya@gmail.com", course: "Python", age: 21 }
  ]);

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="students-page">
      <h2>Students List</h2>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Age</th>
            <th>City</th>
            <th>State</th>
            <th>Pin code</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.age}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;