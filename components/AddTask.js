// components/AddTask.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text || !dueDate) {
            alert('Please fill in all fields');
            return;
        }
        onAdd({ text, dueDate, completed: false });
        setText('');
        setDueDate(null); // Reset the date after submitting
    };

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Enter a Task</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Due Date & Time</label>
                <br />
                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeIntervals={15}
                    placeholderText="Select Date and Time"
                />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    );
};

export default AddTask;
