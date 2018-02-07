var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    body: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);