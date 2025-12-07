import Resource from '../models/Resource.js';
import Booking from '../models/Booking.js';

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchResources = async (req, res) => {
  try {
    const { query } = req.query;
    const resources = await Resource.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterResources = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    
    const resources = await Resource.find(filter);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sortResources = async (req, res) => {
  try {
    const { by } = req.query;
    const sortField = by === 'name' ? 'name' : 'createdAt';
    const resources = await Resource.find().sort(sortField);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookResource = async (req, res) => {
  try {
    const { resourceId, date, startTime, endTime, purpose } = req.body;

    const resource = await Resource.findById(resourceId);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    const existingBooking = await Booking.findOne({
      resource: resourceId,
      date: new Date(date),
      status: { $ne: 'cancelled' },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Resource already booked for this time slot' });
    }

    const booking = await Booking.create({
      resource: resourceId,
      user: req.user._id,
      date,
      startTime,
      endTime,
      purpose
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('resource')
      .populate('user', 'name email');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { date, startTime, endTime, purpose } = req.body;
    
    if (date) booking.date = date;
    if (startTime) booking.startTime = startTime;
    if (endTime) booking.endTime = endTime;
    if (purpose) booking.purpose = purpose;

    await booking.save();
    const updatedBooking = await Booking.findById(booking._id)
      .populate('resource')
      .populate('user', 'name email');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.id })
      .populate('resource')
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResourceBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ resource: req.params.id })
      .populate('resource')
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
