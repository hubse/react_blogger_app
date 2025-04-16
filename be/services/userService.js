const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (username, email, password) => {
  // const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password
  });
  return await newUser.save();
};

const authenticateUser = async (email, password) => {
  
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

module.exports = {
  registerUser,
  authenticateUser
};
