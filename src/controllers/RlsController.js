const RestaurantOwner = require('../models/RlsModel');
const jwt = require('jsonwebtoken');

// Create JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'restaurant-auth-secret', {
    expiresIn: '30d'
  });
};

// Register new restaurant owner
exports.register = async (req, res) => {
  try {
    console.log('Registration request body:', req.body); // Debug log
    
    const { ownerName, email, phone, password } = req.body;
    
    // Additional validation to ensure data is present
    if (!ownerName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Check if email already exists
    const existingOwner = await RestaurantOwner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create new restaurant owner
    const owner = await RestaurantOwner.create({
      ownerName,
      email,
      phone,
      password
    });
    
    // Generate token
    const token = generateToken(owner._id);
    
    // Send response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      owner: {
        id: owner._id,
        ownerName: owner.ownerName,
        email: owner.email,
        phone: owner.phone
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// Login restaurant owner
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if owner exists
    const owner = await RestaurantOwner.findOne({ email });
    if (!owner) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isPasswordValid = await owner.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateToken(owner._id);
    
    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      owner: {
        id: owner._id,
        ownerName: owner.ownerName,
        email: owner.email,
        phone: owner.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};