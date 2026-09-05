const mongoose = require('mongoose');
const User = require('./models/User'); // or wherever your User model is
require('dotenv').config();

const approveUser = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email },
      { isApproved: true },
      { new: true }
    );
    if (user) {
      console.log(`✅ User ${user.email} approved!`);
    } else {
      console.log(`❌ User with email ${email} not found.`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

// Run with a test email
approveUser('teststudent@test.com');