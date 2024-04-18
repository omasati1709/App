// components/Task.js
import { useState } from 'react';
import moment from 'moment';

const Task = ({ task, onDelete, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        onEdit(task.id, editedText, editedDueDate);
        setIsEditing(false);
    };

    return (
        <div className={`task ${task.completed ? 'completed' : ''}`}>
            {!isEditing ? (
                <div>
                    <h3>{task.text}</h3>
                    <p>{moment(task.dueDate).format('MMMM D, YYYY h:mm A')}</p>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={moment(editedDueDate).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                    />
                </div>
            )}
            <div>
                {!isEditing && (
                    <button className="complete-btn" onClick={() => onToggle(task.id)}>
                        {task.completed ? 'Incomplete' : 'Complete'}
                    </button>
                )}
                <button className="edit-btn" onClick={isEditing ? handleSaveEdit : handleEdit}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default Task;
