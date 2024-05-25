// routes/transcription.js
const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcription'); // Change variable name
const { verifyToken } = require('../middlewares/auth');

// Route to create a new transcription
router.post('/save', verifyToken, transcriptionController.createTranscription); // Use transcriptionController

// Route to get all transcriptions of the logged-in user
router.get('/', verifyToken, transcriptionController.getUserTranscriptions); // Use transcriptionController

module.exports = router;
