const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only audio files
    if (!file.mimetype.startsWith('audio/')) {
      return cb(new Error('Only audio files are allowed'));
    }
    cb(null, true);
  },
});

const uploadAudioFile = upload.single('audio');

const handleUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file uploaded' });
  }

  next();
};

module.exports = { uploadAudioFile, handleUpload };
