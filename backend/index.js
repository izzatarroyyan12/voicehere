//index
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/user'); // Import the userRoutes
const transcriptionRoutes = require('./routes/transcription');
const port = process.env.PORT || 6001;

app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON requests
app.use('/user', userRoutes); // Mount the userRoutes under the "/users" path
app.use('/transcription', transcriptionRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    result: 'Hello Dunia!'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});