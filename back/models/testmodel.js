const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    name: String,
    // other fields as needed
});

const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
