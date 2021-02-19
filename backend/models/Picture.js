const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const newPicture = new Schema({
    // data structure    
    fieldname: String,
    originalname: String,
    filename: String,
    path: String,
    size: Number    
})

const Picture = mongoose.model('Picture', newPicture);
module.exports = Picture;