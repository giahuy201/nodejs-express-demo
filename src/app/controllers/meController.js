const Courses = require('../models/Course');
const { mutipleMongooseToObject } = require('../../utill/mongoose');

class MeController {
    // GET/ me/stored/courses
    showMyCourse(req, res, next) {

        /*
        let coursesQueries = Courses.find();
        sort khá dài dòng nên ta tự định nghĩa method sort bằng mongoose trong query helper 
        models/course
        if(req.query.hasOwnProperty('_sort')){
            const isValisType = ['asc', 'desc'].includes(req.query._type);
            coursesQueries.sort({
                [req.query._col] : (isValisType ? req.query._type : 'desc')
            });
        }
        */
        
        // promise.all .then trả về mảng kết quả là [resuiltPromise1, resuiltPromise2]
        // sortable() is method custom in models/Course
        Promise.all([ Courses.find().sortable(req), Courses.countDocumentsDeleted()])
            .then(([courses, deleteCount])=>  res.render('me/myCourses.hbs', {
                courses: mutipleMongooseToObject(courses),
                deleteCount
            }))
            .catch((error) => next(error));
    }

    // GET/ me/trash/courses
    trashCouses(req, res, next) {
    //    method findDeleted in mongoose-delete-flugin
        Courses.findDeleted()
        .then((courses) => {
            res.render('me/myTrash.hbs', {
                courses: mutipleMongooseToObject(courses),
            });
        })
        .catch((error) => next(error));
    }

    // PATCH/ me/trash/restore/:id
    restoreCourses(req, res , next){
        // method restore in mongoose-delete-flugin, delete soft
        Courses.restore({_id : req.params.id})
        .then((courses) => {
            res.redirect('back'); 
        })
        .catch((error) => next(error));
    }

    // DELETE/ me/trash/delete/:id, , delete force
    deleteCourses(req,res, next) {
        Courses.deleteOne({ _id : req.params.id })
        .then(()=>{
            res.redirect('back');
        })
        .catch(error => next(error));
    }

      // DELETE/ me/form-action
    handleFormSubmit(req, res, next) {
        switch(req.body.option){
            case 'delete':
                Courses.delete({_id : {$in: req.body.coursesIds}})
                .then(()=>{
                    res.redirect('back');
                })
                .catch(error => next(error));
                break;
            default: res.json({message: 'Action is invalid'})
        }
    }
}

module.exports = new MeController();
