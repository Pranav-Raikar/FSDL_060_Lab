import React, { useState } from 'react';

function StudentForm({ fetchStudents }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      fetchStudents();
      setFormData({ firstName: '', lastName: '', rollNo: '', password: '', contact: '' });
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="form-grid">
        <input className="input-field" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input className="input-field" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input className="input-field" type="text" name="rollNo" placeholder="Roll No" value={formData.rollNo} onChange={handleChange} required />
        <input className="input-field" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input className="input-field" type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <button type="submit" className="add-btn">Add Student</button>
      </form>
    </div>
  );
}

export default StudentForm;
