const Event = require('../../models/event');
const Tracking = require('../../models/tracking');
const { transformEvent, transformTracking} = require('./merge');

module.exports = {
    trackings: async () => {
        try {
            const trackings = await Tracking.find();
            return trackings.map(tracking => {
                return transformTracking(tracking);
            })
        } catch (err) {
            throw err;
        }
    },
    trackEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const tracking = new Tracking({
            user: '62a0e208fc3afa4ba32ad88c',
            event: fetchedEvent
        });
        const result = await tracking.save();
        return transformTracking(result);
    },
    cancelTracking: async args => {
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