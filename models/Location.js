const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },
    lat: {
        type: String,
        required: [true, 'Must provide Lat'],
        trim: true,
    },
    lng: {
        type: String,
        required: [true, 'Must provide Lng'],
        trim: true,
    },
})

module.exports = mongoose.model('Location', LocationSchema)