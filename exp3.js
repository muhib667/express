// server.js
const express = require('express');
const path = require('path');

const app = express();

// Custom middleware to verify working hours
const verifyWorkingHours = (req, res, next) => {
  const currentTime = new Date();
  const dayOfWeek = currentTime.getDay();
  const currentHour = currentTime.getHours();

  const isWorkingHours = dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17;

  if (!isWorkingHours) {
    return res.send('This page is only available during working hours (Monday to Friday, from 9 AM to 5 PM).');
  }

  next();
};

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Route for the services page with middleware
app.get('/services', verifyWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

// Route for the contact page with middleware
app.get('/contact', verifyWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
