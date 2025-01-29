import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

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

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

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
