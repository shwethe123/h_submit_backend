const express = require('express');
const find_job_controller = require('../../../controller/mobile/find_job/find_job');
const upload = require('../../../utils/find_job');

const router = express.Router();

// Use a more descriptive base route like 'job-posts'
const baseRoute = '/api/job-posts';

router.get(baseRoute, find_job_controller.index);
router.get(`${baseRoute}/:id`, find_job_controller.show);
router.post(baseRoute, upload.single('image'), find_job_controller.store);
router.post(`${baseRoute}/:id/view`, find_job_controller.incrementView);
router.get(`${baseRoute}/popular`, find_job_controller.popular);

// You will need a new route for adding reviews later
// router.post(`${baseRoute}/:id/review`, find_job_controller.addReview);
router.post(`${baseRoute}/:id/view`, find_job_controller.incrementView);
router.post(`${baseRoute}/:id/review`, find_job_controller.addReview);

module.exports = router;