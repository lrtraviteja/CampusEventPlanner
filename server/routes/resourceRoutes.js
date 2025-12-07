import express from 'express';
import {
  getResources,
  getResourceById,
  searchResources,
  filterResources,
  sortResources,
  bookResource,
  cancelBooking,
  updateBooking,
  getResourceBookings,
  deleteBooking,
  deleteResource
} from '../controllers/resourceController.js';
import { protect, admin, facultyOrAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getResources);
router.get('/search', searchResources);
router.get('/filter', filterResources);
router.get('/sort', sortResources);
router.get('/:id', getResourceById);
router.get('/:id/bookings', protect, facultyOrAdmin, getResourceBookings);
router.post('/book', protect, bookResource);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/update', protect, updateBooking);
router.delete('/:id', protect, admin, deleteResource);
router.delete('/:id/booking', protect, facultyOrAdmin, deleteBooking);

export default router;
