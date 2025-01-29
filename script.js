const addTaskBtn = document.getElementById('addTaskBtn');
const taskTitleInput = document.getElementById('taskTitle');
const taskList = document.getElementById('taskList');


window.onload = function() {
    fetchTasks();
};


addTaskBtn.addEventListener('click', async () => {
    const title = taskTitleInput.value.trim();
    if (title) {
        const newTask = { title, completed: false };

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            const task = await response.json();
            addTaskToList(task);
            taskTitleInput.value = ''; 
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});


async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
        tasks.forEach(task => addTaskToList(task));
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}


function addTaskToList(task) {
    const li = document.createElement('li');
    li.id = `task-${task.id}`;
    const taskText = document.createElement('span');
    taskText.textContent = task.title;
    taskText.className = task.completed ? 'completed' : '';
    li.appendChild(taskText);


    taskText.addEventListener('click', () => toggleTaskCompletion(task));


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task));
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}


async function toggleTaskCompletion(task) {
    const updatedTask = { ...task, completed: !task.completed };

    try {
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });
        const updatedTaskData = await response.json();
        const taskElement = document.getElementById(`task-${updatedTaskData.id}`);
        taskElement.querySelector('span').classList.toggle('completed');
    } catch (error) {
        console.error('Error updating task:', error);
    }
}


async function deleteTask(task) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (result.message === 'Task deleted successfully') {
            const taskElement = document.getElementById(`task-${task.id}`);
            taskElement.remove();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}
