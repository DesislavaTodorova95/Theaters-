const mongoose= require('mongoose');
const PlaySchema = new mongoose.Schema({
name: {type: String, required: true},
})
module.exports = mongoose.model('Play', PlaySchema)