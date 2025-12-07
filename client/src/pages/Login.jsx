import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.login(formData);
      login(data);
      toast.success('Login successful!');
      navigate('/resources');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-11/12 max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full p-3 my-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="w-full p-3 my-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded mt-4">Login</button>
        <p className="mt-4 text-center">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
