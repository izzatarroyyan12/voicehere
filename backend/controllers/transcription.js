// controllers/transcription.js
const Transcription = require('../models/transcription');
const User = require('../models/user');
const OpenAI = require('openai');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
  maxRetries: 4,
  timeout: 60 * 1000, // 60s
});

async function whisper({
  file,
  model = 'whisper-1',
  prompt = '',
  response_format = 'json',
  temperature = 0,
  language = 'en',
}) {
  const options = {
    file,
    model,
    prompt,
    response_format,
    temperature,
    language,
  };

  try {
    const response = await openai.audio.translations.create(options);

    return response;
  } catch (error) {
    console.log(error.name, error.message);

    throw error;
  }
}

const createTranscription = async (req, res) => {
  try {
    const response = await whisper({
      file: fs.createReadStream(req.file.path),
      temperature: 1,
    });
    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Error creating transcription:', error.message);
    res.status(500).json({ error: 'Error creating transcription' });
  }
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
        attributes: ['username'],
      },
    });

    res.status(200).json(transcriptions);
  } catch (error) {
    console.error('Error retrieving transcriptions:', error.message);
    res.status(500).json({ error: 'Error retrieving transcriptions' });
  }
};

const getTranscription = async (req, res) => {
  const transcription_id = req.params.id;

  try {
    const transcription = await Transcription.findOne({
      where: { transcription_id },
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    res.status(200).json(transcription);
  } catch (error) {
    console.error('Error retrieving transcription:', error.message);
    res.status(500).json({ error: 'Error retrieving transcription' });
  }
};

const deleteTranscription = async (req, res) => {
  const transcription_id = req.params.id;

  try {
    const transcription = await Transcription.findOne({
      where: { transcription_id },
    });

    if (!transcription) {
      return res.status(404).json({ error: 'Transcription not found' });
    }

    await transcription.destroy();
    res.status(200).json({ message: 'Transcription deleted successfully' });
  } catch (error) {
    console.error('Error deleting transcription:', error.message);
    res.status(500).json({ error: 'Error deleting transcription' });
  }
};

const transcriptionController = {
  getTranscription,
  saveTranscription,
  deleteTranscription,
  getUserTranscriptions,
  createTranscription,
};

module.exports = transcriptionController;
