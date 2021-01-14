let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
});

let callbackRequest = mongoose.model('callbackRequest', callbackRequestSchema, 'callback-requests');

module.exports = {callbackRequest};