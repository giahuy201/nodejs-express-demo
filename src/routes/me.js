const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');

router.get('/stored/courses', meController.showMyCourse);
router.post('/form-action', meController.handleFormSubmit);
router.patch('/trash/restore/:id', meController.restoreCourses);
router.delete('/trash/delete/:id', meController.deleteCourses);
router.get('/trash/courses', meController.trashCouses);


module.exports = router;
