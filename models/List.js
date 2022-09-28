const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    nameDinner: {
        type: String,
        required: true
    },
    week: [
        {
            day: {
                type: String,
                required: true
            }, list: [{
                amount: {
                    type: Int,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                measure: {
                    type: String,
                    required: ture
                }
            },]
        }],
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