// routes/transcription.js
const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcription');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, transcriptionController.getUserTranscriptions);
router.post('/', verifyToken, transcriptionController.createTranscription);

router.get('/:id', transcriptionController.getTranscription);
router.delete('/:id', verifyToken, transcriptionController.deleteTranscription);

router.post('/save', verifyToken, transcriptionController.saveTranscription);

module.exports = router;
