import React, { useState, useEffect } from 'react';
import ReminderList from './components/ReminderList';
import ReminderForm from './components/ReminderForm';
import './App.css';

const App = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetch('/api/reminders')
      .then(response => response.json())
      .then(data => setReminders(data))
      .catch(error => console.error('Error fetching reminders:', error));
  }, []);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const updateReminder = (updatedReminder) => {
    setReminders(reminders.map(reminder => 
      reminder.id === updatedReminder.id ? updatedReminder : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="App">
      <h1>RemindMe</h1>
      <ReminderForm onAdd={addReminder} />
      <ReminderList 
        reminders={reminders} 
        onUpdate={updateReminder} 
        onDelete={deleteReminder} 
      />
    </div>
  );
};

export default App;
