//index
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./routes/user'); // Import the userRoutes
const transcriptionRoutes = require('./routes/transcription');

const port = process.env.PORT || 6001;
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://voicehere.eastasia.cloudapp.azure.com:3000'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON requests
app.use('/user', userRoutes); // Mount the userRoutes under the "/users" path
app.use('/transcribe', transcriptionRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    result: 'Hello Dunia!',
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
