// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Agar tasks localStorage mein hain toh unhe load karo, nahi toh empty array lo
let filter = 'all';  // 'all' ya 'completed' filter ka default value

// Render tasks to the UI
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Purane tasks ko clear kar do
  let filteredTasks = tasks;

  // Filter tasks based on status
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed); // Sirf completed tasks dikhayein
  } else if (filter === 'incomplete') {
    filteredTasks = tasks.filter(task => !task.completed); // Sirf incomplete tasks dikhayein
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li'); // Task ka list item banayein
    li.classList.add(task.completed ? 'completed' : 'incomplete'); // Task ko complete ya incomplete mark karna
    li.innerHTML = `
      <div>
        <span class="task-title">${task.title}</span> <!-- Task ka title dikhayein -->
      </div>
      <div>
        <button class="complete" onclick="toggleComplete(${task.id})">Mark as ${task.completed ? 'Incomplete' : 'Completed'}</button> <!-- Toggle completion -->
        <button class="edit" onclick="editTask(${task.id})">Edit</button> <!-- Edit button -->
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button> <!-- Delete button -->
      </div>
    `;
    taskList.appendChild(li); // Task ko list mein add karo
  });
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Tasks ko localStorage mein save karo
}

// Add Task
document.getElementById('add-task-btn').addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const taskTitle = taskInput.value.trim(); // Task title ko trim karke clean karo
  if (taskTitle) {
    tasks.push({ id: Date.now(), title: taskTitle, completed: false }); // Naya task add karo
    taskInput.value = ''; // Input field ko clear karo
    saveTasks(); // Tasks ko save karo
    renderTasks(); // UI pe tasks render karo
  }
});

// Toggle task completion
function toggleComplete(id) {
  const task = tasks.find(task => task.id === id); // Task ko find karo uske id se
  task.completed = !task.completed; // Task ki completion toggle karo
  saveTasks(); // Tasks ko save karo
  renderTasks(); // UI pe tasks render karo
}

// Edit Task
function editTask(id) {
  const newTitle = prompt('Edit your task:', tasks.find(task => task.id === id).title); // Prompt se naya title lein
  if (newTitle) {
    tasks.find(task => task.id === id).title = newTitle; // Task title update karo
    saveTasks(); // Tasks ko save karo
    renderTasks(); // UI pe tasks render karo
  }
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id); // Task ko delete karo
  saveTasks(); // Tasks ko save karo
  renderTasks(); // UI pe tasks render karo
}

// Filter Tasks
document.getElementById('all-tasks-btn').addEventListener('click', () => {
  filter = 'all'; // All tasks ko show karna
  renderTasks(); // Tasks ko render karo
});

document.getElementById('completed-tasks-btn').addEventListener('click', () => {
  filter = 'completed'; // Sirf completed tasks ko show karna
  renderTasks(); // Tasks ko render karo
});

// Toggle Dark/Light Mode
document.getElementById('toggle-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); // Dark mode toggle karo

  // Mode preference ko localStorage mein save karo
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('mode', 'dark'); // Dark mode save karo
  } else {
    localStorage.setItem('mode', 'light'); // Light mode save karo
  }
});

// Load the saved mode from localStorage on initial load
window.addEventListener('load', () => {
  const savedMode = localStorage.getItem('mode'); // Saved mode ko load karo
  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode'); // Agar dark mode save tha toh dark mode apply karo
  } else {
    document.body.classList.remove('dark-mode'); // Agar light mode save tha toh dark mode hata do
  }

  // Initial render of tasks
  renderTasks(); // Task ko initial render karo
});
