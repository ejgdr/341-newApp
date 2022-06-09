//created to eliminate the use of new Date() in several places
exports.dateToString = date => new Date(date).toISOString();