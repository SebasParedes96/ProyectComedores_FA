const  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {
        type:String,
        required: true
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
    }
})

module.exports = User = mongoose.model('user', UserSchema)