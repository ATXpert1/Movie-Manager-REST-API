const mongoose = require('mongoose');

let subscriptionsSchema = mongoose.Schema({
    memberId: { type: mongoose.SchemaTypes.ObjectId,  unique: true} ,
    movies: [{movieId: mongoose.SchemaTypes.ObjectId, date: Date}],  
})

module.exports = mongoose.model('subscriptions', subscriptionsSchema)
