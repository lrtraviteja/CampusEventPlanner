import express from 'express';
import { getUsageAnalytics, getTopRooms } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/usage', protect, getUsageAnalytics);
router.get('/top-rooms', protect, getTopRooms);

export default router;
