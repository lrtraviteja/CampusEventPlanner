import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.signup(formData);
      login(data);
      toast.success('Signup successful!');
      navigate('/resources');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
     <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-11/12 max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full p-3 my-2 border rounded"
        />
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
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full p-3 my-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded mt-4">Signup</button>
        <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
