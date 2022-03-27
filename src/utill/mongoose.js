module.exports = {
    mutipleMongooseToObject: (courses) =>
        courses.map((course) => course.toObject()),
    mongooseToObject: (course) => course.toObject(),
};
