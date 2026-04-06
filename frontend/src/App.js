import React, { useState, useEffect } from 'react';
import './index.css';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="app-container">
      <h1 className="heading">Student Management System</h1>

      <StudentForm fetchStudents={fetchStudents} />

      <StudentTable
        students={students}
        fetchStudents={fetchStudents}
      />
    </div>
  );
}

export default App;
