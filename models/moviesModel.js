const mongoose = require('mongoose');

let moviesSchema = mongoose.Schema({
    name: String,
    genres: [String],
    image: String,
    premiered: Date
})

module.exports = mongoose.model('movies', moviesSchema);
