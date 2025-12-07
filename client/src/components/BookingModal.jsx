import { useState } from 'react';

const BookingModal = ({ resource, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, resourceId: resource._id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Book {resource.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full p-2 my-2 border rounded"
          />
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
            className="w-full p-2 my-2 border rounded"
          />
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
            className="w-full p-2 my-2 border rounded"
          />
          <textarea
            placeholder="Purpose"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full p-2 my-2 border rounded min-h-20"
          />
          <div className="flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded">Book</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
