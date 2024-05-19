// controllers/transcriptionController.js
const Transcription = require('../models/transcription');
const User = require('../models/user');

// Insert a new transcription
const createTranscription = async (req, res) => {
  const { text, timestamp, audio_file } = req.body;
  const user_id = req.user.user_id;

  try {
    // Create new transcription
    const transcription = await Transcription.create({
      user_id,
      text,
      timestamp,
      audio_file,
    });

    res.status(201).json({ message: 'Transcription created successfully', transcription });
  } catch (error) {
    console.error('Error creating transcription:', error.message);
    res.status(500).json({ error: 'Error creating transcription' });
  }
};

// Read all transcriptions of the logged-in user
const getUserTranscriptions = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const transcriptions = await Transcription.findAll({
      where: { user_id },
      include: {
        model: User,
        attributes: ['username'], // Adjust attributes as needed
      },
    });

    res.status(200).json(transcriptions);
  } catch (error) {
    console.error('Error retrieving transcriptions:', error.message);
    res.status(500).json({ error: 'Error retrieving transcriptions' });
  }
};

module.exports = { createTranscription, getUserTranscriptions };