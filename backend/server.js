const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const { MongoMemoryServer } = require('mongodb-memory-server');

const startServer = async () => {
  let mongoUri = 'mongodb://localhost:27017/studentDB';
  
  try {
    // Attempt connecting to local MongoDB first
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB Connected to local Compass instance.');
  } catch (err) {
    console.log('Local MongoDB not running. Starting in-memory MongoDB instance on port 27017...');
    const mongoServer = await MongoMemoryServer.create({ instance: { port: 27017 } });
    mongoUri = mongoServer.getUri() + "studentDB";
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected (In-memory fallback)');
  }

  // GET all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new student
app.post('/api/students', async (req, res) => {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    rollNo: req.body.rollNo,
    password: req.body.password,
    contact: req.body.contact,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

};

startServer();
