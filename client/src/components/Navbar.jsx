import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 text-white px-4 md:px-8 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold">Campus Booking</Link>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="hidden md:flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/resources" className="hover:text-blue-300">Resources</Link>
              <Link to="/bookings" className="hover:text-blue-300">Bookings</Link>
              <Link to="/analytics" className="hover:text-blue-300">Analytics</Link>
              {(user.role === 'faculty' || user.role === 'admin') && (
                <Link to="/manage" className="hover:text-blue-300">Manage</Link>
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
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-4">
          {user ? (
            <>
              <Link to="/resources" onClick={() => setIsOpen(false)} className="hover:text-blue-300 py-2">Resources</Link>
              <Link to="/bookings" onClick={() => setIsOpen(false)} className="hover:text-blue-300 py-2">Bookings</Link>
              <Link to="/analytics" onClick={() => setIsOpen(false)} className="hover:text-blue-300 py-2">Analytics</Link>
              {(user.role === 'faculty' || user.role === 'admin') && (
                <Link to="/manage" onClick={() => setIsOpen(false)} className="hover:text-blue-300 py-2">Manage</Link>
              )}
              <span className="flex items-center gap-2 py-2"><FaUser /> {user.name}</span>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded flex items-center gap-2 w-full justify-center">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-blue-300 py-2">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="hover:text-blue-300 py-2">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
