require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes
const port = process.env.PORT || 8080;
app.use(express.json()); // Middleware to parse JSON requests
app.use('/users', userRoutes); // Mount the userRoutes under the "/users" path

app.get('/', (req, res) => {
  res.status(200).json({
    result: 'Hello Dunia!'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

