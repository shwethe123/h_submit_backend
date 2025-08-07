const express = require('express');
const router = express.Router();
const post_controller = require('../../../controller/mobile/community/post_controller');
const requireAuth = require('../../../middleware/verifyClerkToken');

// 🔒 Protect routes with Clerk Auth middleware
router.get('/', requireAuth, post_controller.index);
router.post('/', requireAuth, post_controller.store);

module.exports = router;
