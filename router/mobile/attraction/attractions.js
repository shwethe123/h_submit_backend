const express = require('express');
const attractions_controller = require('../../../controller/mobile/attractions/attractions');
const upload = require('../../../utils/multer');

const router = express.Router();

router.get('/api/attractions', attractions_controller.index);
router.post('/api/attractions', upload.single('image'), attractions_controller.store);

router.post('/api/attractions/:id/view', attractions_controller.incrementView);

router.get('/api/attractions/popular', attractions_controller.popular);


module.exports = router;
