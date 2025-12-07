import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { userAPI, resourceAPI } from '../utils/api';
import { toast } from 'react-toastify';
import { FaCalendar, FaClock, FaTimes, FaEdit } from 'react-icons/fa';

const Bookings = () => {
  const [bookings, setBookings] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [updateData, setUpdateData] = useState({ date: '', startTime: '', endTime: '', purpose: '' });
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await userAPI.getBookings(user._id, token);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    }
  };

  const handleCancel = async (id) => {
    try {
      await resourceAPI.cancel(id, token);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking._id);
    setUpdateData({
      date: new Date(booking.date).toISOString().split('T')[0],
      startTime: booking.startTime,
      endTime: booking.endTime,
      purpose: booking.purpose
    });
  };

  const handleUpdate = async (id) => {
    try {
      await resourceAPI.update(id, updateData, token);
      toast.success('Booking updated successfully');
      setEditingBooking(null);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  
  return (
    <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      {bookings===null ? <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">Loading...</div> :
      bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">{booking.resource?.name}</h3>
              {editingBooking === booking._id ? (
                <div className="space-y-2">
                  <input type="date" value={updateData.date} onChange={(e) => setUpdateData({...updateData, date: e.target.value})} className="w-full p-2 border rounded" />
                  <input type="time" value={updateData.startTime} onChange={(e) => setUpdateData({...updateData, startTime: e.target.value})} className="w-full p-2 border rounded" />
                  <input type="time" value={updateData.endTime} onChange={(e) => setUpdateData({...updateData, endTime: e.target.value})} className="w-full p-2 border rounded" />
                  <input type="text" value={updateData.purpose} onChange={(e) => setUpdateData({...updateData, purpose: e.target.value})} placeholder="Purpose" className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(booking._id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setEditingBooking(null)} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-gray-600 mb-2"><FaCalendar /> {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2 text-gray-600 mb-2"><FaClock /> {booking.startTime} - {booking.endTime}</p>
                  <p className="text-gray-700 mb-3">Purpose: {booking.purpose}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs text-white ${booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {booking.status}
                  </span>
                  {booking.status === 'confirmed' && (
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleEdit(booking)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleCancel(booking._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
