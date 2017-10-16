var mongoose = require('mongoose');

//create mongo schema
var commentSchema = new mongoose.Schema({
   text: String,
   author: String
});

module.exports = mongoose.model('Comment',commentSchema);
