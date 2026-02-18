import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    projectTitle: "",
    technologies: ""
  });

  // FETCH STUDENTS
  const loadStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setForm({
      name: "",
      email: "",
      department: "",
      year: "",
      projectTitle: "",
      technologies: ""
    });

    loadStudents();
  };

  // DELETE
  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE"
    });
    loadStudents();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>Student Project Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {["name", "email", "department", "year", "projectTitle", "technologies"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
          )
        )}
        <button>Add Student</button>
      </form>

      <hr />

      {/* SEARCH */}
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      {/* LIST */}
      {students
        .filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px"
            }}
          >
            <h3>{s.name}</h3>
            <p>{s.email}</p>
            <p>
              {s.department} – Year {s.year}
            </p>
            <p>
              <strong>{s.projectTitle}</strong>
            </p>
            <p>Tech: {s.technologies}</p>
            <button onClick={() => deleteStudent(s._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default App;
