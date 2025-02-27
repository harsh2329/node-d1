const express = require('express');
const app = express();
const UserRoutes = require('./routes/UserRoutes');

// ...existing code...

app.use('/api', UserRoutes);

// ...existing code...

module.exports = app;
