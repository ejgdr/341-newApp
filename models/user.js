const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateBirth: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    originallyFrom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);