// controllers/transcription.js
const Transcription = require('../models/transcription');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const createTranscription = async (req, res) => {
  const { audio_file } = req.body;
  const text = 'This is a dummy transcription';

  res.status(200).json({ text, audio_file });
};

// Insert a new transcription
const saveTranscription = async (req, res) => {
  const { text, audio_file, audio_name } = req.body;
  const user_id = req.user.user_id;

  const transcription_id = uuidv4();
  const timestamp = Math.floor(Date.now() / 1000);
  try {
    // Create new transcription
    const transcription = await Transcription.create({
      transcription_id,
      user_id,
      text,
      timestamp,
      audio_file,
      audio_name,
    });
    res.status(201).json({ message: 'Transcription created successfully', transcription });
  } catch (error) {
    console.log(error);
    console.error('Error creating transcription:', error.message);
    res.status(500).json({ error });
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

const transcriptionController = {
  saveTranscription,
  getUserTranscriptions,
  createTranscription,
};

module.exports = transcriptionController;
