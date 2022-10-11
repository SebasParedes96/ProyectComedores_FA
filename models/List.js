const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    nameDiner: {
        type: String,
        required: true
    },
    weekNumber:{
        type:String,
        required:true
    },
    week: [
        {
            day: {
                type: String
            }, list: [{
                amount: {
                    type: Number
                },
                name: {
                    type: String
                },
                measure: {
                    type: String
                },
            },]
        }],
    user: {
        type: Number,
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

module.exports = List = mongoose.model('list', ListSchema)