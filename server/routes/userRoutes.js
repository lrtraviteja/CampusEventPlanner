import express from 'express';
import { getUserBookings } from '../controllers/resourceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/bookings', protect, getUserBookings);

export default router;
