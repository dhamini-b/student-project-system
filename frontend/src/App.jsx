import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  // Fetch students (GET)
  const fetchStudents = () => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form submit (POST)
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page refresh

    const newStudent = {
      name,
      email,
      department,
      year
    };

    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newStudent)
    })
      .then((res) => res.json())
      .then(() => {
        // Clear form
        setName("");
        setEmail("");
        setDepartment("");
        setYear("");

        // Refresh list
        fetchStudents();
      })
      .catch((err) => console.error("Error adding student:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Project System</h1>

      {/* Student Form */}
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Student</button>
      </form>

      <hr />

      {/* Student List */}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} — {student.department} (Year {student.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
