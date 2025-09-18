import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';


const router = express.Router();

// Student Login Route
router.post('/student-login', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res.status(400).json({ success: false, message: 'Student ID and password are required' });
    }

    // Validate student ID format (12 digits)
    if (!/^\d{12}$/.test(studentId)) {
      return res.status(400).json({ success: false, message: 'Student ID must be exactly 12 digits' });
    }

    const student = await Student.findOne({ studentId }).select('+studentPassword');
    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid student ID or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, student.studentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid student ID or password' });
    }

    const token = jwt.sign(
      { id: student._id, studentId: student.studentId, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await Student.findByIdAndUpdate(student._id, { lastLogin: new Date() });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        studentId: student.studentId,
        studentName: student.studentName,
        email: student.email,
        collegeName: student.collegeName,
        deptName: student.deptName,
        deptId: student.deptId,
        yearOfAdmission: student.yearOfAdmission,
        currentYear: student.currentYear
      }
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// // Middleware to verify student token
// const verifyStudentToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access token required'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'student') {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied'
//       });
//     }
//     req.student = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token'
//     });
//   }
// };

// Middleware to verify student token
const verifyStudentToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'student') return res.status(403).json({ success: false, message: 'Access denied' });

    req.student = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Protected route - Get student profile
// Protected - Get student profile
router.get('/student-profile', verifyStudentToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-studentPassword');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, student });
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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
// Token validation
router.get('/verify-token', verifyStudentToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-studentPassword');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, valid: true, student });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, valid: false, message: 'Invalid token' });
  }
});


// FACULTY AUTH BELOW
import Faculty from '../models/faculty.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// Faculty Login Route
router.post('/faculty-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Faculty email and password are required'
      });
    }

    // Find faculty in MongoDB
    const faculty = await Faculty.findOne({ email }).select('+facultyPassword');

    if (!faculty) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, faculty.facultyPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token
    const facultyToken = jwt.sign(
      {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        role: 'faculty'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login timestamp
    await Faculty.findByIdAndUpdate(faculty._id, {
      lastLogin: new Date()
    });

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token: facultyToken,
      faculty: {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        name: faculty.name.full,
        email: faculty.email,
        designation: faculty.designation,
        department: faculty.department,
        roles: faculty.roles,
        expertise: faculty.expertise
      }
    });

  } catch (error) {
    console.error('Faculty login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Middleware to verify faculty token
const verifyFacultyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const facultyToken = authHeader && authHeader.split(' ')[1];

  if (!facultyToken) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(facultyToken, process.env.JWT_SECRET);
    if (decoded.role !== 'faculty') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    req.faculty = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

//search

// Faculty search students
router.get('/search', verifyFacultyToken, async (req, res) => {
  try {
    const { query } = req.query; // example: ?query=John
    if (!query) return res.status(400).json({ success: false, message: 'Search query required' });

    const students = await Student.find({
      $or: [
        { studentName: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { collegeName: { $regex: query, $options: 'i' } },
        { deptName: { $regex: query, $options: 'i' } }
      ]
    }).select('-studentPassword');

    res.json({ success: true, results: students });
  } catch (error) {
    console.error('Faculty search error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


//above - search route

// Protected route - Get faculty profile
router.get('/faculty-profile', verifyFacultyToken, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-facultyPassword');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    res.json({
      success: true,
      faculty: {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        name: faculty.name.full,
        email: faculty.email,
        designation: faculty.designation,
        department: faculty.department,
        roles: faculty.roles,
        expertise: faculty.expertise,
        status: faculty.status
      }
    });
  } catch (error) {
    console.error('Get faculty profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update faculty details route (blank for now)
router.put('/update-faculty', verifyFacultyToken, async (req, res) => {
  try {
    // Keep blank for now
    res.json({
      success: true,
      message: 'Update faculty endpoint - to be implemented'
    });
  } catch (error) {
    console.error('Update faculty details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Token validation route
router.get('/verify-faculty-token', verifyFacultyToken, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-facultyPassword');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    res.json({
      success: true,
      valid: true,
      faculty: {
        id: faculty._id,
        facultyId: faculty.faculty_id,
        name: faculty.name.full,
        designation: faculty.designation,
        department: faculty.department,
        roles: faculty.roles
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


//NEW ROUTES - TO BE REVISED FURTHER BEFORE PRESENTATION

// Add this route after your existing faculty routes in auth.js

// Get all students - Faculty only access
router.get('/faculty/students', verifyFacultyToken, async (req, res) => {
  try {
    // Optional: Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Fetch students with only required fields
    const students = await Student.find({})
      .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
      .sort({ studentName: 1 }) // Sort by name
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalStudents = await Student.countDocuments();

    res.json({
      success: true,
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        totalStudents,
        hasNext: page < Math.ceil(totalStudents / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// // Get specific student by ID - Faculty only access
// router.get('/faculty/students/:studentId', verifyFacultyToken, async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const student = await Student.findOne({ studentId })
//       .select('-studentPassword'); // Exclude password

//     if (!student) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     res.json({
//       success: true,
//       student
//     });
//   } catch (error) {
//     console.error('Get student by ID error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Faculty search students (enhanced existing route)
// router.get('/faculty/search', verifyFacultyToken, async (req, res) => {
//   try {
//     const { query, department, year } = req.query;
    
//     if (!query && !department && !year) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'At least one search parameter required' 
//       });
//     }

//     // Build search criteria
//     let searchCriteria = {};
    
//     if (query) {
//       searchCriteria.$or = [
//         { studentName: { $regex: query, $options: 'i' } },
//         { studentId: { $regex: query, $options: 'i' } },
//         { email: { $regex: query, $options: 'i' } },
//         { collegeName: { $regex: query, $options: 'i' } }
//       ];
//     }
    
//     if (department) {
//       searchCriteria.deptName = { $regex: department, $options: 'i' };
//     }
    
//     if (year) {
//       searchCriteria.currentYear = parseInt(year);
//     }

//     const students = await Student.find(searchCriteria)
//       .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
//       .sort({ studentName: 1 })
//       .limit(100); // Limit search results

//     res.json({ 
//       success: true, 
//       results: students,
//       count: students.length 
//     });
//   } catch (error) {
//     console.error('Faculty search error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal server error' 
//     });
//   }
// });

// Faculty search students (generic query supported)
router.get('/faculty/search', verifyFacultyToken, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query required' 
      });
    }

    // Build generic search criteria
    let searchCriteria = {
      $or: [
        { studentName: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { collegeName: { $regex: query, $options: 'i' } },
        { deptName: { $regex: query, $options: 'i' } } // added back for dept search
      ]
    };

    // Optional: if query looks numeric, also try matching currentYear
    if (!isNaN(query)) {
      searchCriteria.$or.push({ currentYear: parseInt(query) });
    }

    const students = await Student.find(searchCriteria)
      .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
      .sort({ studentName: 1 })
      .limit(100);

    res.json({ 
      success: true, 
      results: students,
      count: students.length 
    });
  } catch (error) {
    console.error('Faculty search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});


// Additional middleware for admin access (to be implemented)
const verifyAdminToken = (req, res, next) => {
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
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Middleware for faculty OR admin access
const verifyFacultyOrAdminToken = (req, res, next) => {
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
    if (decoded.role !== 'faculty' && decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Faculty or Admin access required'
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Alternative route with faculty OR admin access
router.get('/students', verifyFacultyOrAdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const students = await Student.find({})
      .select('studentName studentId deptName email collegeName currentYear yearOfAdmission')
      .sort({ studentName: 1 })
      .skip(skip)
      .limit(limit);

    const totalStudents = await Student.countDocuments();

    res.json({
      success: true,
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        totalStudents,
        hasNext: page < Math.ceil(totalStudents / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});






export default router;
