/**
 * @file app.js
 * @summary Express server for tasks API
 * @description This file defines the Express server for the tasks API. It includes routes for creating, reading, updating, and deleting tasks.
 * @requires express
 * @requires cors
 * @exports app
 * @exports server
 * 
 */



import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

/**
 * @method POST
 * @route /tasks
 * @description Create a new task
 * @param {string} title - The title of the task
 * @param {boolean} completed - The status of the task (completed or not)
 * @returns {object} The new task
 * @throws {400} If title or completed field is missing
 * @example
 * {
 *  "title": "Task 1",
 * "completed": false
 * }
 */

app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;

    if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Title and completed field are required." });
    }

    const newTask = {
        id: idCounter++,
        title,
        completed: completed || false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

/**
 * @method GET
 * @route /tasks
 * @description Get all tasks
 * @returns {array} An array of tasks
 * @example
 * [
 * {
 * "id": 1,
 * "title": "Task 1",
 * "completed": false
 * }
 * ]
 */

app.get('/tasks', (req, res) => {
    res.json(tasks);
});


/**
 * @method PUT
 * @route /tasks/:id
 * @description Update a task
 * @param {string} title - The updated title of the task
 * @param {boolean} completed - The updated status of the task (completed or not)
 * @returns {object} The updated task
 * @throws {404} If the task is not found
 * @example
 * {
 * "title": "Task 1 updated",
 * "completed": true
 * }
 */

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    if (title) task.title = title;
    if (typeof completed === 'boolean') task.completed = completed;

    res.json(task);
});


/**
 * @method DELETE
 * @route /tasks/:id
 * @description Delete a task
 * @returns {object} A message indicating the task was deleted successfully
 * @throws {404} If the task is not found
 * @example
 * DELETE /tasks/1
 * 
 */

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
export { server };
