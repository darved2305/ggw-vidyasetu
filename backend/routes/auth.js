import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

const router = express.Router();

// Student Login Route
router.post('/student-login', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Validate input
    if (!studentId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and password are required'
      });
    }

    // Validate student ID format (12 digits)
    if (!/^\d{12}$/.test(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'Student ID must be exactly 12 digits'
      });
    }

    // Find student in MongoDB
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid student ID or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, student.studentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid student ID or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: student._id,
        studentId: student.studentId,
        role: 'student'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login timestamp
    await Student.findByIdAndUpdate(student._id, {
      lastLogin: new Date()
    });

    // Return success response (without password)
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      student: {
        id: student._id,
        studentId: student.studentId,
        studentName: student.studentName,
        collegeName: student.collegeName,
        deptName: student.deptName,
        deptId: student.deptId
      }
    });

  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Middleware to verify student token
const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    req.student = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Protected route - Get student profile
router.get('/student-profile', verifyStudentToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-studentPassword');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student: {
        id: student._id,
        studentId: student.studentId,
        studentName: student.studentName,
        collegeName: student.collegeName,
        deptName: student.deptName,
        deptId: student.deptId,
        email: student.email
      }
    });
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update student details route (blank for now)
router.put('/update-details', verifyStudentToken, async (req, res) => {
  try {
    // Keep blank for now
    res.json({
      success: true,
      message: 'Update details endpoint - to be implemented'
    });
  } catch (error) {
    console.error('Update details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Token validation route
router.get('/verify-token', verifyStudentToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-studentPassword');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      valid: true,
      student: {
        id: student._id,
        studentId: student.studentId,
        studentName: student.studentName,
        collegeName: student.collegeName,
        deptName: student.deptName,
        deptId: student.deptId
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      valid: false,
      message: 'Invalid token'
    });
  }
});

export default router;