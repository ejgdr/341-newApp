const authResolver = require('./auth');
const eventsResolver = require('./events');
const trackingResolver = require('./tracking');

const rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...trackingResolver
};

module.exports = rootResolver;