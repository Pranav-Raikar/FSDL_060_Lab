import React from 'react';

function StudentTable({ students, fetchStudents }) {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.rollNo}</td>
              <td>{student.contact}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
