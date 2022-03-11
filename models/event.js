const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    date: String,
    pulseCount: Int,
    gammaEV: Double,
    scintillationId: String

});

module.exports = mongoose.model('Event', eventSchema);

