const  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    DNI: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type_User: {
       type: String,
       required: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    leavingDate: {
        type: Date,
        default: null
    }
})

module.exports = User = mongoose.model('user', UserSchema)