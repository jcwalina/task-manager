import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Task } from '../../types/tasks';

interface TaskDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (taskData: Omit<Task, 'id'>, id?: string) => void;
    initialData?: Task;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setStatus(initialData.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('todo');
        }
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit({ title, description, status }, initialData?.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? 'Edit Task' : 'New Task'}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Description"
                    margin="dense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value as any)}>
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDialog;
