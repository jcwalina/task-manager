import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '../../types/tasks';
import TaskCard from '../Task/TaskCard';

interface TaskListDnDProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    reorderFn: (tasks: Task[], startIndex: number, endIndex: number) => Task[];
}

const TaskListDnD: React.FC<TaskListDnDProps> = ({ tasks, setTasks, onEditTask, onDeleteTask, reorderFn }) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reordered = reorderFn(tasks, result.source.index, result.destination.index);
        setTasks(reordered);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Draggable draggableId={task.id} index={index} key={task.id}>
                                {(providedDrag) => (
                                    <div
                                        ref={providedDrag.innerRef}
                                        {...providedDrag.draggableProps}
                                        {...providedDrag.dragHandleProps}
                                    >
                                        <TaskCard task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TaskListDnD;
