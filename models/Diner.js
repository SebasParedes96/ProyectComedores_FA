const  mongoose = require('mongoose')

const DinerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    user:{
        type: Int,
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

module.exports = Diner = mongoose.model('diner', DinerSchema)