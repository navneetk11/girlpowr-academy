require('dotenv').config();
const mongoose = require('mongoose');
const Program = require('./models/Program');

const programs = [
  {
    name: 'Training Pathway',
    programType: 'Training',
    description: 'Foundational dance training pathway',
    cities: ['London ON', 'Ajax ON', 'Etobicoke ON'],
    requiresAudition: false,
  },
  {
    name: 'Toddlers, Tots & Preschoolers',
    programType: 'T&T',
    description: 'Early years program for young children',
    cities: ['London ON', 'Ajax ON'],
    requiresAudition: false,
  },
  {
    name: 'Online Program',
    programType: 'Online',
    description: 'Remote dance training accessible anywhere',
    cities: ['Online'],
    requiresAudition: false,
  },
  {
    name: 'Girl Pow-R',
    programType: 'GirlPowR',
    description: 'Elite audition-only performance program',
    cities: ['London ON', 'Ajax ON', 'Etobicoke ON'],
    requiresAudition: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Program.deleteMany({});
    await Program.insertMany(programs);

    console.log('4 programs seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDB();