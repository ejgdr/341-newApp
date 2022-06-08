const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectID,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
}, {timestamps: true}
);

module.exports = mongoose.model('Tracking', trackingSchema);