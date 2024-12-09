import { Task } from '../types/tasks';

export function reorderTasks(tasks: Task[], startIndex: number, endIndex: number): Task[] {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}
