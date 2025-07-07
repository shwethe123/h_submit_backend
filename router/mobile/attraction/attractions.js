const express = require('express');
const attractions_controller = require('../../../controller/mobile/attractions/attractions');
const upload = require('../../../utils/multer');

const router = express.Router();

// Get all attractions
router.get('/api/attractions', attractions_controller.index);

// --- 👇 ဒီ route အသစ်ကို ထပ်ထည့်ပါ ---
// Get a single attraction by ID
router.get('/api/attractions/:id', attractions_controller.show);
// --- 👆 ဒီ route အသစ်ကို ထပ်ထည့်ပါ ---

// Create a new attraction
router.post('/api/attractions', upload.single('image'), attractions_controller.store);

// Increment view count for an attraction
router.post('/api/attractions/:id/view', attractions_controller.incrementView);

// Get popular attractions
router.get('/api/attractions/popular', attractions_controller.popular);

module.exports = router;