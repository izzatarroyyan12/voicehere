// routes/transcription.js
const express = require('express');
const router = express.Router();
const { createTranscription, getUserTranscriptions } = require('../controllers/transcriptionController');
const { verifyToken } = require('../middlewares/auth');

// Route to create a new transcription
router.post('/transcribe', verifyToken, createTranscription);

// Route to get all transcriptions of the logged-in user
router.get('/transcriptions', verifyToken, getUserTranscriptions);

module.exports = router;