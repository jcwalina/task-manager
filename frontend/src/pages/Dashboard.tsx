import React, { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/tasksService';
import { Task } from '../types/tasks';
import TaskDialog from '../components/Task/TaskDialog';
import TaskListDnD from '../components/DragDrop/TaskListDnD';
import { reorderTasks } from '../utils/reorderTasks';
import RoleProtected from '../components/RoleProtected';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks().then(setTasks);
    }, []);

    const handleCreate = () => {
        setEditTask(null);
        setDialogOpen(true);
    };

    const handleEdit = (task: Task) => {
        setEditTask(task);
        setDialogOpen(true);
    };

    const handleDialogSubmit = async (data: Omit<Task, 'id'>, id?: string) => {
        if (id) {
            const updated = await updateTask({ id, ...data });
            setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        } else {
            const created = await createTask(data);
            setTasks((prev) => [...prev, created]);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="body1" gutterBottom>Welcome, {user?.username}! Role: {user?.role}</Typography>
            <RoleProtected requiredRole="admin">
                <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={handleCreate}>
                    Add New Task
                </Button>
            </RoleProtected>
            <TaskListDnD
                tasks={tasks}
                setTasks={setTasks}
                onEditTask={handleEdit}
                onDeleteTask={handleDelete}
                reorderFn={reorderTasks}
            />
            {dialogOpen && (
                <TaskDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onSubmit={handleDialogSubmit}
                    initialData={editTask || undefined}
                />
            )}
        </Box>
    );
};

export default Dashboard;
