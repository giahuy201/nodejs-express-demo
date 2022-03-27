const express = require('express');
const router = express.Router();

// site dành cho những trang như home , contact, ít slug
const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.home);

module.exports = router;
