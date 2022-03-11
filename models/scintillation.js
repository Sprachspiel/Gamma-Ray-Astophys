const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scintillationSchema = new Schema({
    material: String,
    location: String,
    method: String,
    

});

module.exports = mongoose.model('Scintillation', scintillationSchema);
