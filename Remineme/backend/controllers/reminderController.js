const Reminder = require('../models/reminder');

exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({ where: { userId: req.user.id } });
    res.json(reminders);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
};

exports.createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(reminder);
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({ error: 'Failed to create reminder' });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    await reminder.update(req.body);
    res.json(reminder);
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({ error: 'Failed to update reminder' });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    await reminder.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ error: 'Failed to delete reminder' });
  }
};
