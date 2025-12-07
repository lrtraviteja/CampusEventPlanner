import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaChartBar, FaBook } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      <div className="text-center py-16 px-8 bg-linear-to-br from-indigo-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Campus Resource Booking System</h1>
        <p className="text-xl mb-8">Book rooms, labs, and sports facilities with ease</p>
        <Link to="/resources" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Browse Resources
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-16">
        <Link to="/resources" className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <FaCalendarAlt size={50} className="mx-auto mb-4 text-blue-500" />
          <h3 className="text-2xl font-bold mb-2">Easy Booking</h3>
          <p className="text-gray-600">Book resources in just a few clicks</p>
        </Link>
        <Link to="/bookings" className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <FaBook size={50} className="mx-auto mb-4 text-green-500" />
          <h3 className="text-2xl font-bold mb-2">Manage Bookings</h3>
          <p className="text-gray-600">View and manage all your bookings</p>
        </Link>
        <Link to="/analytics" className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <FaChartBar size={50} className="mx-auto mb-4 text-red-500" />
          <h3 className="text-2xl font-bold mb-2">Analytics</h3>
          <p className="text-gray-600">Track usage trends and statistics</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
