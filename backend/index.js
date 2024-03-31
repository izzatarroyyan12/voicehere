require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).json({
    result: 'Hello Dunia!'
  });
});

app.listen(port, () => {
  console.log('app is running at port:', port);
});