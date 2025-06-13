document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Add task when button is clicked
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don’t save again
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create task <li> element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // When Remove button is clicked
        removeButton.onclick = function () {
            taskItem.remove();
            removeFromStorage(taskText); // Remove from localStorage
        };

        // Add remove button to task item
        taskItem.appendChild(removeButton);
        // Add task item to list
        taskList.appendChild(taskItem);

        // Save task to localStorage if needed
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Function to remove task from localStorage
    function removeFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
