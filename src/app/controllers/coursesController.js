const Courses = require('../models/Course');
const { mongooseToObject } = require('../../utill/mongoose');

class CoursesController {
    // GET/ couses/:slug
    showCourse(req, res, next) {
        const query = Courses.where({ slug: req.params.slug });
        query.findOne(function (err, doc) {
            if (doc) {
                res.render('course/detailCourse.hbs', {
                    course: mongooseToObject(doc),
                });
            } else {
                next(err);
                // method next() mà có param thì sẽ lập tức tìm đến function middleware có 4 tham số (err, req, res, next), 
            }
        });
    }

    // GET / Courses/create
    createCourse(req, res, next) {
        res.render('course/createCourse.hbs');
    }

    // POST / Courses/store
    storeCourse(req, res, next) {
        Courses.create(req.body, function (err, Course) {
            if (err) next(err);
            else {
                res.redirect('/me/stored/courses');
            }
        });
    }

    // GET / Courses/edit/:id
    editId (req, res, next){
        Courses.findById({_id : req.params.id})
            .then(course=>{
                res.render('course/editCourse', {course : mongooseToObject(course)});
            })
            .catch(error => next(error));
    }

    // PUT / Courses/update/:id 
    updateId (req, res, next){
        /* Cach 1:
        var query = {'_id': req.params.id};
        Courses.findOneAndUpdate(query, req.body, {upsert : true })
            .then(course=>{
                res.redirect('/me/stored/courses'); 
            })
            .catch(error => next(error));*/
        // cách 2
        Courses.updateOne({_id : req.params.id}, req.body)
            .then(course=>{
                res.redirect('/me/stored/courses'); 
            })
            .catch(error => next(error));
    }

    // DELETE / Courses/delete/:id
    deleteId (req, res, next){
    //    delete soft : delete soft, restore, delete force
        Courses.delete({ _id : req.params.id })
            .then(()=>{
                res.redirect('back');
            })
            .catch(error => next(error));
    }

    searchCourseId(req, res, next){
        
    }   
}

module.exports = new CoursesController();
