// routes/transcription.js
const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcription');
const { verifyToken } = require('../middlewares/auth');

// Route to create a new transcription
router.post('/', verifyToken, transcriptionController.createTranscription);
router.post('/save', verifyToken, transcriptionController.saveTranscription); // Use transcriptionController

// Route to get all transcriptions of the logged-in user
router.get('/', verifyToken, transcriptionController.getUserTranscriptions); // Use transcriptionController

module.exports = router;
