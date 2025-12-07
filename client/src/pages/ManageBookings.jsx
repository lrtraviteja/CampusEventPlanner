import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { resourceAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FaCalendar, FaClock, FaTrash, FaUser } from 'react-icons/fa';

const ManageBookings = () => {
  const { token } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data } = await resourceAPI.getAll();
      setResources(data);
    } catch (error) {
      toast.error('Failed to fetch resources');
    }
  };

  const fetchBookings = async (resourceId) => {
    setLoading(true);
    try {
      const { data } = await resourceAPI.getResourceBookings(resourceId, token);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleResourceChange = (resourceId) => {
    setSelectedResource(resourceId);
    if (resourceId) fetchBookings(resourceId);
    else setBookings([]);
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await resourceAPI.deleteBooking(bookingId, token);
      toast.success('Booking deleted successfully');
      fetchBookings(selectedResource);
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold mb-6">Manage Resource Bookings</h2>
      
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Select Resource:</label>
        <select
          value={selectedResource}
          onChange={(e) => handleResourceChange(e.target.value)}
          className="w-full md:w-96 p-3 border rounded"
        >
          <option value="">-- Select a Resource --</option>
          {resources.map((resource) => (
            <option key={resource._id} value={resource._id}>
              {resource.name} ({resource.type})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">Loading...</div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">
          {selectedResource ? 'No bookings found for this resource' : 'Please select a resource to view bookings'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">{booking.resource?.name}</h3>
              <p className="flex items-center gap-2 text-gray-600 mb-2">
                <FaUser /> {booking.user?.name} ({booking.user?.email})
              </p>
              <p className="flex items-center gap-2 text-gray-600 mb-2">
                <FaCalendar /> {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2 text-gray-600 mb-2">
                <FaClock /> {booking.startTime} - {booking.endTime}
              </p>
              <p className="text-gray-700 mb-3">Purpose: {booking.purpose}</p>
              <span className={`inline-block px-2 py-1 rounded text-xs text-white ${booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}>
                {booking.status}
              </span>
              <button
                onClick={() => handleDelete(booking._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
              >
                <FaTrash /> Delete Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
