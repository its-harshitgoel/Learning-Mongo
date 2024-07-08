const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,    // Ensures uniqueness of email addresses
        trim: true,      // Trims whitespace from input
        lowercase: true  // Converts email to lowercase before saving
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // Sets default value to current date/time
    }
});

// Export User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
