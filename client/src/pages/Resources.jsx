import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { resourceAPI } from '../utils/api';
import ResourceCard from '../components/ResourceCard';
import BookingModal from '../components/BookingModal';
import { toast } from 'react-toastify';
import { FaSearch, FaSortAlphaDown, FaTrash } from 'react-icons/fa';

const Resources = () => {
  const { token, user } = useContext(AuthContext);
  const [resources, setResources] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('');

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

  const handleSearch = async () => {
    if (!searchQuery) return fetchResources();
    try {
      const { data } = await resourceAPI.search(searchQuery);
      setResources(data);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const handleFilter = async (type) => {
    setFilterType(type);
    if (!type) return fetchResources();
    try {
      const { data } = await resourceAPI.filter(type, '');
      setResources(data);
    } catch (error) {
      toast.error('Filter failed');
    }
  };

  const handleSort = async (field) => {
    if (sortBy === field) {
      setSortBy('');
      fetchResources();
    } else {
      setSortBy(field);
      try {
        const { data } = await resourceAPI.sort(field);
        setResources(data);
      } catch (error) {
        toast.error('Sort failed');
      }
    }
  };

  const handleBook = async (bookingData) => {
    try {
      await resourceAPI.book(bookingData, token);
      toast.success('Booking successful!');
      setSelectedResource(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      await resourceAPI.delete(id, token);
      toast.success('Resource deleted successfully');
      fetchResources();
    } catch (error) {
      toast.error('Failed to delete resource');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border rounded"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded">
            <FaSearch />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={() => handleFilter('')} className={`px-4 py-2 rounded ${filterType === '' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>All</button>
          <button onClick={() => handleFilter('room')} className={`px-4 py-2 rounded ${filterType === 'room' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>Rooms</button>
          <button onClick={() => handleFilter('lab')} className={`px-4 py-2 rounded ${filterType === 'lab' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>Labs</button>
          <button onClick={() => handleFilter('sports')} className={`px-4 py-2 rounded ${filterType === 'sports' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>Sports</button>
          <span className="mx-2">|</span>
          <button onClick={() => handleSort('name')} className={`px-4 py-2 rounded flex items-center gap-2 ${sortBy === 'name' ? 'bg-green-500 text-white' : 'bg-white border'}`}>
            <FaSortAlphaDown /> Sort by Name
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources===null && <div className="p-8 bg-gray-100 min-h-[calc(100vh-80px)]">Loading...</div>}
        {resources?.map((resource) => (
          <div key={resource._id} className="relative">
            <ResourceCard resource={resource} onBook={setSelectedResource} />
            {user?.role === 'admin' && (
              <button
                onClick={() => handleDelete(resource._id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                title="Delete Resource"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedResource && (
        <BookingModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onSubmit={handleBook}
        />
      )}
    </div>
  );
};

export default Resources;
