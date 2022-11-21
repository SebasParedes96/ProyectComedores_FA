const  mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    measure: {
        type: String,
        required:true
    },
    leavingDate: {
        type: Date,
        default: null
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)