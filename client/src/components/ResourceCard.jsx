import { FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const ResourceCard = ({ resource, onBook }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition">
      <img src={resource.image || 'https://via.placeholder.com/300x200'} alt={resource.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{resource.name}</h3>
        <p className="flex items-center gap-2 text-gray-600 mb-1"><FaMapMarkerAlt /> {resource.type}</p>
        <p className="flex items-center gap-2 text-gray-600 mb-2"><FaUsers /> Capacity: {resource.capacity}</p>
        <p className="text-gray-700 mb-3">{resource.description}</p>
        <span className={`inline-block px-2 py-1 rounded text-xs text-white ${resource.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`}>
          {resource.status}
        </span>
        {resource.status === 'available' && (
          <button onClick={() => onBook(resource)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
