const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    username: { type: String, required: true },
    email: { type: String, required: true },
    birthdate: { type: Date, required: true },
});

module.exports = mongoose.model('Users', UserSchema);
