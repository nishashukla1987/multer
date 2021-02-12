const express = require('express');
const app = express();
const PORT = 5000;
const multer = require('multer');

const cors = require('cors');

// cors use for cross-origin-problem
app.use(cors());

// static public folder
app.use(express.static('./public'));
// setting for view engine
app.set('view engine', 'hbs');
// settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function (req, file, callback) {
    callback(null, 'profile_' + Date.now() + '_' + file.originalname);
  },
});
const upload = multer({ storage });

// routes
app.get('/', (req, res) => {
  res.render('index');
});

// testing file upload
app.post('/upload', upload.single('profilePic'), (req, res) => {
  console.log(req.file);
  //res.redirect('/')
  const filename = req.file.filename;
  res.render('index', {
    profilePic: '/images/' + filename,
    message: '1 Picture uploaded',
  });
});

// testing file upload
app.post('/api/picture/upload', upload.single('profilePic'), (req, res) => {
  const picture = req.file;
  console.log(picture);
  res.json({
    picture: picture,
    message: 'Picture uploaded successfully',
  });
});

app.listen(PORT, () => {
  console.log('Server is running');
});
