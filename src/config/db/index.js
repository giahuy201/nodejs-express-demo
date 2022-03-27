const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Courses');
        console.log('successfully connect to monggo');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { connect };
