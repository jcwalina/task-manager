import React from 'react';
import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../../types/tasks';
import RoleProtected from '../RoleProtected';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    return (
        <Card variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">{task.description}</Typography>
            </CardContent>
            <CardActions>
                <RoleProtected requiredRole="admin">
                    <IconButton onClick={() => onEdit(task)}><EditIcon /></IconButton>
                    <IconButton onClick={() => onDelete(task.id)}><DeleteIcon /></IconButton>
                </RoleProtected>
            </CardActions>
        </Card>
    );
};

export default TaskCard;
