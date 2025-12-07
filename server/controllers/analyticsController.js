import Booking from '../models/Booking.js';

export const getUsageAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalBookings = await Booking.countDocuments({ user: userId });
    const activeBookings = await Booking.countDocuments({ user: userId, status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ user: userId, status: 'cancelled' });

    const bookingsByType = await Booking.aggregate([
      { $match: { user: userId } },
      { $lookup: { from: 'resources', localField: 'resource', foreignField: '_id', as: 'resourceData' } },
      { $unwind: '$resourceData' },
      { $group: { _id: '$resourceData.type', count: { $sum: 1 } } }
    ]);

    res.json({
      totalBookings,
      activeBookings,
      cancelledBookings,
      bookingsByType
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopRooms = async (req, res) => {
  try {
    const userId = req.user._id;
    const topRooms = await Booking.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$resource', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'resources', localField: '_id', foreignField: '_id', as: 'resource' } },
      { $unwind: '$resource' },
      { $project: { name: '$resource.name', type: '$resource.type', bookings: '$count' } }
    ]);

    res.json(topRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
