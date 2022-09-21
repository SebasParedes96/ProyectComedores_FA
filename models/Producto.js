const  mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    measure: {
        type: String,
        required:ture
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)