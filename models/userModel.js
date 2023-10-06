const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: [true, 'Email already exist']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)