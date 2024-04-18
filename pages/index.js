// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState('');

  // Check if user's name is stored in local storage
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      const name = prompt("Please enter your name:");
      if (name) {
        setUserName(name);
        localStorage.setItem('userName', name);
      }
    }
  }, []);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Edit Task
  const editTask = (id, newText, newDueDate) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: newText, dueDate: newDueDate } : task
    ));
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Task Completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Sort tasks by priority, name, or due date
  const sortTasks = (sortBy) => {
    if (sortBy === 'priority') {
      setTasks([...tasks].sort((a, b) => a.priority - b.priority));
    } else if (sortBy === 'dueDate') {
      setTasks([...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    } else if (sortBy === 'name') {
      setTasks([...tasks].sort((a, b) => a.text.localeCompare(b.text)));
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <title>To-Do List</title>
        <main>
          <header>To-Do List</header>
          <AddTask onAdd={addTask} />
          <div className='add-form'>
            <label>Sort By:</label>
            <select onChange={(e) => sortTasks(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
              <option value="name">Task Name</option>
            </select>
          </div>
          {tasks.length > 0 ? (
            <TaskList className='task-item' tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} onEdit={editTask} />
          ) : (
            <label>No tasks to show</label>
          )}
        </main>

        <footer>
          <p>Created by {userName}</p>
        </footer>

        <style jsx>{`
        footer {
          margin-top: 50px;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          padding: 10px;
        }
        label{
          font-weight:600;
          padding:10px;
          margin-top:20;
          font-size:15px;
        }
        
      `}</style>
      </div>
    </div>
  );
}
