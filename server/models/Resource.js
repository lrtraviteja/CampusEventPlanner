import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['room', 'lab', 'sports'] },
  capacity: { type: Number, required: true },
  description: String,
  image: String,
  amenities: [String],
  status: { type: String, enum: ['available', 'maintenance'], default: 'available' }
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource
