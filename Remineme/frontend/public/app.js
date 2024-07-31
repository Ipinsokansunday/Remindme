document.getElementById('reminder-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;

  const reminder = { title, description, date };

  try {
    const response = await fetch('http://localhost:3000/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(reminder)
    });

    if (response.ok) {
      alert('Reminder added successfully');
      loadReminders();
    } else {
      alert('Failed to add reminder');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding reminder');
  }
});

async function loadReminders() {
  try {
    const response = await fetch('http://localhost:3000/api/reminders', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const reminders = await response.json();
    const reminderList = document.getElementById('reminder-list');
    reminderList.innerHTML = '';
    reminders.forEach(reminder => {
      const div = document.createElement('div');
      div.textContent = `${reminder.title} - ${reminder.date}`;
      reminderList.appendChild(div);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

loadReminders();
