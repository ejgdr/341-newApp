const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Tracking = require('../../models/tracking');

// I will access part of the data with functions to get results without creating loops, and can create relations with more flexibility
const events = async eventIds => {
    try {
        const events = await Event.find({_id: {$in: eventIds}})
            events.map(event => {
            return { ...event._doc, _id: event.id, date: new Date(event._doc.date).toISOString(), creator: user.bind(this, event.creator) };
        });
        return events;
    } catch (err) {
        throw err;
    };
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return { ...event._doc, _id: event.id, creator: user.bind(this, event.creator)};
    } catch (err) {
        throw err;
    }
}

// To have the logic to check the creations of the user, without making an infinite loop
const user = async userId => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) }
    } catch (err) {
        throw err;
    };
};

module.exports = {
    events: async () => {
        try {
        const events = await Event.find()
            return events.map(event => {
                return { ...event._doc, _id: event.id, date: new Date(event._doc.date).toISOString(), creator: user.bind(this, event._doc.creator) }; // using the user function
            });
        } catch (err) {
            throw err;
        };
    },
    trackings: async () => {
        try {
            const trackings = await Tracking.find();
            return trackings.map(tracking => {
                return { ...tracking._doc, _id: tracking.id, user: user.bind(this, tracking._doc.user), event: singleEvent.bind(this, tracking._doc.user), createdAt: new Date(tracking._doc.createdAt.toISOString()), updatedAt: new Date(tracking._doc.createdAt.toISOString())};
            })
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '62a0e208fc3afa4ba32ad88c'
        });
        let createdEvent;
        try{
        const result = await event.save()
            createdEvent = { ...result._doc, _id: result._doc._id.toString(), date: new Date(event._doc.date).toISOString(), creator: user.bind(this, result._doc.creator) };
            const creator = await User.findById('62a0e208fc3afa4ba32ad88c')
            if(!creator) {
                throw new Error ('User not found');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch(err) {
            console.log(err);
            throw err;
        }
        return event;
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email})
            if(existingUser) {
                throw new Error ('User already exists.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();
        
            return { ...result._doc, password: null, _id: result.id }; //to make it even more secure we will retrieve password as null
        } catch(err) {
            throw err;
        };                
    },
    trackEvent: async args => {
        const fetchedEvent = await Event.findOne({_id: args.eventId})
        const tracking = new Tracking({
            user: '62a0e208fc3afa4ba32ad88c',
            event: fetchedEvent
        });
        const result = await tracking.save();
        return { ...result._doc, _id: result.id, createdAt: new Date(result._doc.createdAt.toISOString()), updatedAt: new Date(result._doc.createdAt.toISOString())};
    },
    cancelTracking: async args => {
        try {
            const tracking = await Tracking.findById(args.trackingId).populate('event');
            const event = { ...tracking.event._doc, _id: tracking.event.id, creator: user.bind(this, tracking.event._doc.creator) } 
            await Tracking.deleteOne({_id: args.trackingId});
            return event;
        } catch(err) {
            throw err;
        }
    }
};