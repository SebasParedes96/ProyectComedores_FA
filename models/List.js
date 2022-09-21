const  mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    nameDinner: {
        type:String,
        required: true
    },
    week: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = List = mongoose.model('list', ListSchema)