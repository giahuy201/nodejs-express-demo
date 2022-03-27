const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/coursesController');

// có thể viết hàm controller.functionhand() ở tham số thứ 2 của router nhưng phải tuân theo mvc nên controller được chuyển qua thư mục Controller 

router.get('/:slug', coursesController.showCourse);
router.get('/create', coursesController.createCourse);
router.post('/store', coursesController.storeCourse);
router.get('/search/:id', coursesController.searchCourseId);

router.get('/edit/:id', coursesController.editId);
router.put('/update/:id', coursesController.updateId);
router.delete('/delete/:id', coursesController.deleteId);

module.exports = router;
