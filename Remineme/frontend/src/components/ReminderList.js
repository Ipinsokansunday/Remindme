import React from 'react';

const ReminderList = ({ reminders, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>Reminder List</h2>
      <ul>
        {reminders.map(reminder => (
          <li key={reminder.id}>
            <h3>{reminder.title}</h3>
            <p>{reminder.description}</p>
            <p>{reminder.date}</p>
            <button onClick={() => onDelete(reminder.id)}>Delete</button>
            <button onClick={() => onUpdate(reminder)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
