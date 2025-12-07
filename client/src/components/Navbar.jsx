import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-slate-800 text-white">
      <Link to="/" className="text-2xl font-bold">Campus Booking</Link>
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link to="/resources" className="hover:text-blue-300">Resources</Link>
            <Link to="/bookings" className="hover:text-blue-300">My Bookings</Link>
            <Link to="/analytics" className="hover:text-blue-300">Analytics</Link>
            {(user.role === 'faculty' || user.role === 'admin') && (
              <Link to="/manage" className="hover:text-blue-300">Manage Bookings</Link>
            )}
            <span className="flex items-center gap-2"><FaUser /> {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded flex items-center gap-2">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-300">Login</Link>
            <Link to="/signup" className="hover:text-blue-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
