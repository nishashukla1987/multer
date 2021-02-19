const express = require('express');
const app = express();
const PORT = 5000;
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const Picture = require('./models/Picture');
const User = require('./models/User');
// connecting mongodb
mongoose
  .connect('mongodb://localhost:27017/multer', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongodb is connected...'))
  .catch((error) => console.log('mongodb connection error', error));
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
app.post('/api/picture/upload', upload.single('profilePic'), (req, res) => {
  //-------------------uncomment this,also appjs-----------//

  // upload picture for specific user
  // this id should come after login
  // const userId = '60104057562677a210f9b3f4';
  const picture = req.file;
  // console.log('picture data after upload', picture);
  // const picture_path = '/images/' + picture.filename;
  // // add picture to user model
  // User.findByIdAndUpdate(userId, { picture: picture_path }, (err) => {
  //   if (err) throw err;
  //   res.json('profile picture updated...');
  // });
  //-------------------------------------//

  //----------comment it and uncomment the upper code-----------//
  const newPicture = new Picture(picture);
  // saving picture into DB
  newPicture.save((err, data) => {
    res.json({
      picture: picture,
      message: 'Picture uploaded successfully',
    });
  });
});
//----------------------------//

// See All pictures
app.get('/api/allpicture', (req, res) => {
  Picture.find((err, pictures) => {
    res.json(pictures);
  });
});
app.get('/api/test', (req, res) => {
  res.json('route is ok');
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
// find user data by id
///api/user/600adc24d8eff454a394092f
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId, (err, user) => {
    res.json(user);
  });
});
app.listen(PORT, () => {
  console.log('Server is running');
});
