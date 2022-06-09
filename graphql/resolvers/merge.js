// file created to clean up some code
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

// I will access part of the data with functions to get results without creating loops, and can create relations with more flexibility
const events = async eventIds => {
    try {
        const events = await Event.find({_id: {$in: eventIds}})
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    };
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
}

// To have the logic to check the creations of the user, without making an infinite loop
const user = async userId => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) }; // using the user function
    } catch (err) {
        throw err;
    };
};

//to avoid writing the same code over and over...\
const transformEvent = event => {
    return { ...event._doc, _id: event.id, date: dateToString(event._doc.date), creator: user.bind(this, event.creator) };
}

//another dedicated function to reduce code
const transformTracking = event => {
    return { ...event._doc, _id: event.id, user: user.bind(this, event._doc.user), event: singleEvent.bind(this, event._doc.event), createdAt: dateToString(event._doc.createdAt), updatedAt: dateToString(event._doc.createdAt)};
}

exports.transformEvent = transformEvent;
exports.transformTracking = transformTracking;