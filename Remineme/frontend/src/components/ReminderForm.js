import React, { useState } from 'react';

const ReminderForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReminder = { title, description, date };
    fetch('/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReminder),
    })
      .then(response => response.json())
      .then(data => onAdd(data))
      .catch(error => console.error('Error adding reminder:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label>Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <button type="submit">Add Reminder</button>
    </form>
  );
};

export default ReminderForm;
