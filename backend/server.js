const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory tasks store
// Each task: { id: string, title: string, description: string, status: 'todo'|'in-progress'|'done' }
let tasks = [];

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// CREATE a new task
app.post('/api/tasks', (req, res) => {
    const { title, description, status } = req.body;
    const newTask = { id: Date.now().toString(), title, description, status: status || 'todo' };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// UPDATE a task
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    tasks = tasks.map(t => t.id === id ? { ...t, title, description, status } : t);
    const updatedTask = tasks.find(t => t.id === id);
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const existingLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    if (tasks.length === existingLength) return res.status(404).json({ error: 'Task not found' });
    res.status(204).end();
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
