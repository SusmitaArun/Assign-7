// script.js
async function submitForm() {
    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const additionalDetails = document.getElementById('additionalDetails').value;
  
    const taskData = {
      courseId,
      taskName,
      dueDate,
      additionalDetails,
    };
  
    try {
      // Send taskData to the backend using fetch
      const response = await fetch('http://localhost:3000/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error('Error adding task');
      }
  
      console.log('Task added successfully');
      // Clear form fields after successful submission
      document.getElementById('courseId').value = '';
      document.getElementById('taskName').value = '';
      document.getElementById('dueDate').value = '';
      document.getElementById('additionalDetails').value = '';
  
      // Update the task list
      fetchTasks(courseId);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  async function fetchTasks(courseId) {
    try {
      // Fetch tasks for a specific course from the backend
      const response = await fetch(`http://localhost:3000/courses/${courseId}/tasks`);
  
      if (!response.ok) {
        throw new Error('Error fetching tasks');
      }
  
      const tasks = await response.json();
  
      // Display the tasks on the page
      const taskListElement = document.getElementById('taskList');
      taskListElement.innerHTML = '<h2>Task List</h2>';
      if (tasks.length === 0) {
        taskListElement.innerHTML += '<p>No tasks for this course.</p>';
      } else {
        tasks.forEach((task) => {
          taskListElement.innerHTML += `
            <div>
              <strong>${task.taskName}</strong>
              <p>Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
              <p>${task.additionalDetails || 'No additional details.'}</p>
            </div>
          `;
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  // Initial fetch for tasks (for demonstration purposes)
  fetchTasks('CSE-101');
  
  