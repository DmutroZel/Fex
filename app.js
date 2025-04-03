const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const mongose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongose.connect('mongodb+srv://admin:oYfrAqgrXD10xcDg@cluster0.84fbg.mongodb.net/?appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Update the File model to include originalFilename
const File = mongose.model('File', {
  profilePicture: String,
  originalFilename: String,
  code: Number
});

// Update the upload route to store original filename
app.post('/upload', upload.single('file'), (req, res) => {
console.log(req.file);
const profilePicture = req.file.filename;
const originalFilename = req.file.originalname;
let code = Math.floor(Math.random()* (999999 - 100000 ) + 100000);

const file = new File({ profilePicture, originalFilename, code });
file.save()
.then(() => {
  console.log('File saved successfully');
  res.json({ code });
})
.catch(err => {
  console.error('Error saving file:', err);
  res.status(500).json({ error: 'Error saving file' });
});
});

// Fix the download route
app.get('/download/:code', async (req, res) => {
try {
  const code = parseInt(req.params.code);
  const file = await File.findOne({ code: code });
  
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  const filePath = path.join(__dirname, 'uploads', file.profilePicture);
  


  res.download(filePath, file.originalFilename, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).json({ error: 'Error downloading file' });
    }
  });

} catch (err) {
  console.error('Error:', err);
  res.status(500).json({ error: 'Server error' });
}
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
