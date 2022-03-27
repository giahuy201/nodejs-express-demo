const { doc } = require('prettier');
const Course = require('../models/Course');
const Author = require('../models/Author');

const { mutipleMongooseToObject } = require('../../utill/mongoose');

class SiteController {
    // GET/HOME
    async home(req, res, next) {
        // trả về dữ liệu trong mongodb bằng json ở trang home

        /*
        cách 1 : callback
        Course.find({}, function (err, course) {
            if (!err) res.json(course);
            else {
                // sử lý middleware ở chỗ khác khi truyền qua next
               next(err);
            }
        });*/

        // cách 2 dùng promise

        /*Course.find({})
            .then(courses =>{
            // lỗi khi truy cập property của object contructor func , lỗi của handebars nên phải chuyển courses qua mảng đối tượng bình thường bằng toObject của mongoose
                res.render('home.hbs', {courses : mutipleMongooseToObject(courses)})
            })
            .catch(next);*/

        // cách 3 : dùng async await
        try {
            const arr = await Course.find({});
            res.render('home.hbs', { courses: mutipleMongooseToObject(arr) });
        } catch (error) {
            next(error);
        }
    }

    search(req, res) {
        res.render('search.hbs');
    }
}

module.exports = new SiteController();
