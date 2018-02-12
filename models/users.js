var mongoose = require("mongoose");
var passport_local_mongoose = require("passport-local-mongoose");

var user_schema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
});

user_schema.plugin(passport_local_mongoose);

module.exports = mongoose.model("User", user_schema);;