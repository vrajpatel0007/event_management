const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String
    },
    maxAttendees: {
        type: Number
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    }
},
    {
        timestamps: true,
    });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;