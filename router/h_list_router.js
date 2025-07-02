const express = require('express');
const h_list_controller = require('../controller/h_list_controller');

const router = express.Router();

router.get('/api/h_list', h_list_controller.index);

router.post('/api/h_list', h_list_controller.post);

module.exports = router;