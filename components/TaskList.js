// components/TaskList.js
import Task from './Task';

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
    return (
        <div className='task-list'>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default TaskList;

