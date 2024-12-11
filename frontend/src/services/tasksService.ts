import { Task } from '../types/tasks';

const BASE_URL = 'http://localhost:8000/api/tasks';

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(BASE_URL);
    return await res.json();
}

export async function createTask(newTask: Omit<Task, 'id'>): Promise<Task> {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
    });
    return await res.json();
}

export async function updateTask(updatedTask: Task): Promise<Task> {
    const res = await fetch(`${BASE_URL}/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
    });
    return await res.json();
}

export async function deleteTask(id: string): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
}
