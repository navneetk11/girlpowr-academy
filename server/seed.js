require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Program = require('./models/Program');
const User = require('./models/User');

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
    cities: [],
    isOnline: true,
    requiresAudition: false,
  },
  {
    name: 'Girl Pow-R',
    programType: 'GirlPowR',
    description: 'Elite audition-only performance program',
    cities: [],
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

    const adminEmail = 'admin@girlpowr.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin123!', await bcrypt.genSalt(10));
      await User.create({
        fullName: 'Dawn (Admin)',
        email: adminEmail,
        passwordHash,
        role: 'admin',
        isApproved: true,
      });
      console.log(`Admin account created: ${adminEmail} / Admin123!`);
    } else {
      console.log('Admin account already exists, skipping');
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDB();