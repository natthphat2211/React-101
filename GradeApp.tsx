import { useState } from "react";

interface Subject {
  name: string;
  grade: string;
}

const gradePoint: Record<string, number> = {
  "A": 4.0,
  "B+": 3.5,
  "B": 3.0,
  "C+": 2.5,
  "C": 2.0,
  "D+": 1.5,
  "D": 1.0,
  "F": 0.0,
  "W": 0.0,
};

function GradeApp() {
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>("A");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (subject.trim() === "") return;
    setSubjects([...subjects, { name: subject, grade }]);
    setSubject("");
    setGrade("A");
  };

  const deleteSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => s.grade !== "W");
    if (validSubjects.length === 0) {
      setGpa(0);
      return;
    }
    const totalPoints = validSubjects.reduce(
      (sum, s) => sum + gradePoint[s.grade],
      0
    );
    setGpa(totalPoints / validSubjects.length);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>📚 GPA Calculator</h1>

      <input
        type="text"
        value={subject}
        placeholder="ชื่อวิชา"
        onChange={(e) => setSubject(e.target.value)}
      />

      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option>A</option>
        <option>B+</option>
        <option>B</option>
        <option>C+</option>
        <option>C</option>
        <option>D+</option>
        <option>D</option>
        <option>F</option>
        <option>W</option>
      </select>

      <button onClick={addSubject} style={{ marginLeft: "10px" }}>
        เพิ่มวิชา
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {subjects.map((s, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            <span
              style={{
                color: s.grade === "F" ? "red" : "black",
                fontWeight: "bold",
              }}
            >
              {s.name} ({s.grade})
            </span>
            <button
              onClick={() => deleteSubject(index)}
              style={{ marginLeft: 10, color: "red" }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA} style={{ marginTop: "10px" }}>
        คำนวณ GPA
      </button>

      {gpa !== null && (
        <h2 style={{ marginTop: "15px" }}>
          🎯 GPA: {gpa.toFixed(2)}
        </h2>
      )}
    </div>
  );
}

export default GradeApp;
