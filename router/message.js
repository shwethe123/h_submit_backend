const express = require('express');
const message_controller = require('../controller/message_controller');
const requireAuth = require('../middleware/verifyClerkToken');

const router = express.Router();

router.get('/api/message', requireAuth, message_controller.index);
router.post('/api/message', requireAuth, message_controller.store);

module.exports = router;
