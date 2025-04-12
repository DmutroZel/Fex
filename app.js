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



const User = mongose.model('User', {
    profilePicture: String,
    code: Number
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  const profilePicture = req.file.filename;
  let code = Math.floor(Math.random()* (999999 - 100000 ) + 100000);
  
  const user = new User({  profilePicture, code });
  user.save()
  .then(() => {
    console.log('User saved successfully');
  })
  res.json({ code });
});

app.get('/download/:code', (req, res) => {
  const code = req.params.code;
  User.findOne({ code: code })
  .then((user) => {
    if(user) {
      res.json({file: user.profilePicture, code: user.code});
    } else {
      res.status(404).json({error: 'User not found'});
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
