const AdminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "admin_secret_key_123"; // Use environment variables in production

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    const admin = await AdminModel.findOne({ username });
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    // Update last login time
    admin.lastLogin = new Date();
    await admin.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      secret,
      { expiresIn: '8h' }
    );
    
    // Set HTTP-only cookie with token
    res.cookie('admin_token', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict'
    });
    
    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
    
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

const adminLogout = (req, res) => {
  try {
    res.clearCookie('admin_token');
    res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout"
    });
  }
};

// For creating initial admin account
const createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this username already exists"
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new admin
    const admin = new AdminModel({
      username,
      password: hashedPassword
    });
    
    await admin.save();
    
    res.status(201).json({
      success: true,
      message: "Admin account created successfully"
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

// Authentication middleware for protected routes
const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.admin_token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }
    
    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  createAdmin,
  adminAuthMiddleware
};