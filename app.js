/**
 * @file app.js
 * @summary Express server for managing tasks
 * @description This file sets up an Express server to provide an API for creating, reading, updating, and deleting tasks.
 * @requires express
 * @requires cors
 * @exports app
 * @exports server
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

/**
 * @method POST
 * @route /tasks
 * @description Create a new task
 * @param {string} title - The title of the task
 * @param {boolean} completed - The task's completion status
 * @returns {object} The newly created task
 * @throws {400} If title or completed field is missing
 * @example
 * {
 *   "title": "Task 1",
 *   "completed": false
 * }
 */

app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;

    if (!title || typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Both title and completed status are required." });
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
 * @description Retrieve all tasks
 * @returns {array} A list of tasks
 * @example
 * [
 *   {
 *     "id": 1,
 *     "title": "Task 1",
 *     "completed": false
 *   }
 * ]
 */

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

/**
 * @method PUT
 * @route /tasks/:id
 * @description Update an existing task
 * @param {string} title - The updated title of the task
 * @param {boolean} completed - The updated completion status of the task
 * @returns {object} The updated task
 * @throws {404} If the task with the given ID is not found
 * @example
 * {
 *   "title": "Updated Task 1",
 *   "completed": true
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
 * @description Delete a task by ID
 * @returns {object} A confirmation message
 * @throws {404} If the task with the given ID is not found
 * @example
 * DELETE /tasks/1
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
