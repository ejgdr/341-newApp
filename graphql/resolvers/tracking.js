const Event = require('../../models/event');
const Tracking = require('../../models/tracking');
const { transformEvent, transformTracking} = require('./merge');

module.exports = {
    trackings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('User is not authenticated');
        }
        try {
            const trackings = await Tracking.find();
            return trackings.map(tracking => {
                return transformTracking(tracking);
            })
        } catch (err) {
            throw err;
        }
    },
    trackEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('User is not authenticated');
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const tracking = new Tracking({
            user: req.userId,
            event: fetchedEvent
        });
        const result = await tracking.save();
        return transformTracking(result);
    },
    cancelTracking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('User is not authenticated');
        }
        try {
            const tracking = await Tracking.findById(args.trackingId).populate('event');
            const event = transformEvent(tracking.event); 
            await Tracking.deleteOne({ _id: args.trackingId });
            return event;
        } catch(err) {
            throw err;
        }
    }
};