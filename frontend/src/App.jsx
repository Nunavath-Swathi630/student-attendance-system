import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    department: "",
    year: ""
  });

  const loadStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      setForm({
        name: "",
        rollNumber: "",
        department: "",
        year: ""
      });

      setShowForm(false);
      loadStudents();
    } catch (error) {
      alert("Unable to add student");
    }
  };

  const toggleAttendance = async (student) => {
    const newStatus =
      student.status === "Present" ? "Absent" : "Present";

    try {
      await fetch(`${API_URL}/${student._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      loadStudents();
    } catch (error) {
      alert("Unable to update attendance");
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      loadStudents();
    } catch (error) {
      alert("Unable to delete student");
    }
  };

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Student Attendance System</h1>
          <p>Manage and track student attendance</p>
        </div>

        <div className="date">
          📅 {new Date().toLocaleDateString()}
        </div>
      </header>

      <main className="container">

        <section className="cards">
          <div className="card">
            <h3>Total Students</h3>
            <p className="number">{students.length}</p>
          </div>

          <div className="card present">
            <h3>Present</h3>
            <p className="number">{presentCount}</p>
          </div>

          <div className="card absent">
            <h3>Absent</h3>
            <p className="number">{absentCount}</p>
          </div>
        </section>

        <section className="attendance-section">

          <div className="section-header">
            <div>
              <h2>Today's Attendance</h2>
              <p>Mark students as present or absent</p>
            </div>

            <button
              className="add-button"
              onClick={() => setShowForm(!showForm)}
            >
              + Add Student
            </button>
          </div>

          {showForm && (
            <form className="student-form" onSubmit={addStudent}>

              <input
                type="text"
                placeholder="Student Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Roll Number"
                value={form.rollNumber}
                onChange={(e) =>
                  setForm({ ...form, rollNumber: e.target.value })
                }
                required
              />

              <input
                type="text"
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Year"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: e.target.value })
                }
                required
              />

              <button type="submit">
                Save Student
              </button>

            </form>
          )}

          <div className="table-container">

            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>

                {students.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id}>

                      <td>{student.rollNumber}</td>

                      <td>{student.name}</td>

                      <td>{student.department}</td>

                      <td>{student.year}</td>

                      <td>
                        <span
                          className={
                            student.status === "Present"
                              ? "status present-status"
                              : "status absent-status"
                          }
                        >
                          {student.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="attendance-btn"
                          onClick={() => toggleAttendance(student)}
                        >
                          {student.status === "Present"
                            ? "Mark Absent"
                            : "Mark Present"}
                        </button>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteStudent(student._id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>
            </table>

          </div>

        </section>

      </main>
    </div>
  );
}

export default App;