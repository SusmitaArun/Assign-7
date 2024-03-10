// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the mongoose schema and model for the 'tasks' collection
const taskSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  taskName: { type: String, required: true },
  dueDate: { type: Date, required: true },
  additionalDetails: String,
});

const Task = mongoose.model('Task', taskSchema);

// Define the route to add a task
app.post('/addTask', (req, res) => {
  const { courseId, taskName, dueDate, additionalDetails } = req.body;
 // Create a mongoose model for the 'tasks' collection
 const Task = mongoose.model('Task', {
    courseId,
    taskName,
    dueDate,
    additionalDetails,
  });
  // Save the task to the 'tasks' collection
  const newTask = new Task({
    courseId,
    taskName,
    dueDate,
    additionalDetails,
  });

  newTask.save((err) => {
    if (err) {
      console.error('Error saving task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Task saved successfully');
      res.status(200).json({ message: 'Task added successfully' });
    }
  });
});

// Define the route to retrieve tasks for a specific course
// Define the route to retrieve tasks for a specific course
app.get('/courses/:courseId/tasks', (req, res) => {
  const courseId = req.params.courseId;

  // Use mongoose to fetch tasks from the 'tasks' collection based on courseId
  Task.find({ courseId })
    .exec((err, tasks) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(tasks);
      }
    });
});
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager!');
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

