import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { analyticsAPI } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-toastify';

const COLORS = ['#3498db', '#27ae60', '#e74c3c', '#f39c12'];

const Analytics = () => {
  const { token } = useContext(AuthContext);
  const [usage, setUsage] = useState(null);
  const [topRooms, setTopRooms] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [usageRes, topRoomsRes] = await Promise.all([
        analyticsAPI.getUsage(token),
        analyticsAPI.getTopRooms(token)
      ]);
      setUsage(usageRes.data);
      setTopRooms(topRoomsRes.data);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    }
  };

  if (!usage) return <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">Loading...</div>;

  const pieData = [
    { name: 'Active', value: usage.activeBookings },
    { name: 'Cancelled', value: usage.cancelledBookings }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold mb-6">Booking Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-4xl font-bold text-blue-500">{usage.totalBookings}</h3>
          <p className="text-gray-600 mt-2">Total Bookings</p>
        </div>
        <div className="bg-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-4xl font-bold text-green-500">{usage.activeBookings}</h3>
          <p className="text-gray-600 mt-2">Active Bookings</p>
        </div>
        <div className="bg-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-4xl font-bold text-red-500">{usage.cancelledBookings}</h3>
          <p className="text-gray-600 mt-2">Cancelled Bookings</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Top Booked Resources</h3>
          <BarChart width={500} height={300} data={topRooms}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings">
              {topRooms.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Booking Status</h3>
          <PieChart width={400} height={300}>
            <Pie data={pieData} cx={200} cy={150} outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
