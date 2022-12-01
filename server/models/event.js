const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    imageUrl:{
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    
    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true,
    },

    questions:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema);
