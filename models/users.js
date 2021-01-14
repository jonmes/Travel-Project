let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
    email: String,
    password : String
})

let User = new mongoose.model('User', usersSchema, 'users');
module.exports = {User};