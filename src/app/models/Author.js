const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Athor = new Schema({
    name: String,
    job: String,
});

module.exports = mongoose.model('Author', Athor);
