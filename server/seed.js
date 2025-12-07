import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resource from './models/Resource.js';

dotenv.config();

const resources = [
  {
    name: 'Conference Room A',
    type: 'room',
    capacity: 20,
    description: 'Large conference room with projector and whiteboard',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
    amenities: ['Projector', 'Whiteboard', 'AC'],
    status: 'available'
  },
  {
    name: 'Computer Lab 1',
    type: 'lab',
    capacity: 30,
    description: 'Computer lab with 30 workstations',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
    amenities: ['Computers', 'Printer', 'AC'],
    status: 'available'
  },
  {
    name: 'Basketball Court',
    type: 'sports',
    capacity: 10,
    description: 'Indoor basketball court',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
    amenities: ['Basketball', 'Scoreboard'],
    status: 'available'
  },
  {
    name: 'Study Room B',
    type: 'room',
    capacity: 8,
    description: 'Small study room for group discussions',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500',
    amenities: ['Whiteboard', 'AC'],
    status: 'available'
  },
  {
    name: 'Chemistry Lab',
    type: 'lab',
    capacity: 25,
    description: 'Fully equipped chemistry laboratory',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500',
    amenities: ['Lab Equipment', 'Safety Gear', 'Ventilation'],
    status: 'available'
  },
  {
    name: 'Tennis Court',
    type: 'sports',
    capacity: 4,
    description: 'Outdoor tennis court',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500',
    amenities: ['Tennis Net', 'Lighting'],
    status: 'available'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Resource.deleteMany({});
    console.log('Cleared existing resources');

    await Resource.insertMany(resources);
    console.log('Sample resources added');

    mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
