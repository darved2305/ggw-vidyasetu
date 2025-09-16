// seedData.js - Script to add sample students to MongoDB
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Student Schema (inline for this script)
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{12}$/,
    index: true
  },
  studentPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  collegeName: {
    type: String,
    required: true,
    trim: true
  },
  deptName: {
    type: String,
    required: true,
    trim: true
  },
  deptId: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    default: null,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('studentPassword')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.studentPassword = await bcrypt.hash(this.studentPassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Student = mongoose.model('Student', studentSchema);

// Sample student data
const sampleStudents = [
  {
    studentId: '123456789012',
    studentPassword: 'password123',
    studentName: 'Rahul Sharma',
    collegeName: 'Delhi University',
    deptName: 'Computer Science',
    deptId: 'CS001',
    email: 'rahul.sharma@du.ac.in'
  },
  {
    studentId: '234567890123',
    studentPassword: 'mypassword456',
    studentName: 'Priya Patel',
    collegeName: 'IIT Mumbai',
    deptName: 'Information Technology',
    deptId: 'IT002',
    email: 'priya.patel@iitb.ac.in'
  },
  {
    studentId: '345678901234',
    studentPassword: 'secure789',
    studentName: 'Arjun Kumar',
    collegeName: 'NIT Trichy',
    deptName: 'Electronics Engineering',
    deptId: 'EC003',
    email: 'arjun.kumar@nitt.edu'
  },
  {
    studentId: '456789012345',
    studentPassword: 'student2024',
    studentName: 'Sneha Gupta',
    collegeName: 'Jadavpur University',
    deptName: 'Mechanical Engineering',
    deptId: 'ME004',
    email: null // Email can be null initially
  },
  {
    studentId: '567890123456',
    studentPassword: 'demo123456',
    studentName: 'Vikram Singh',
    collegeName: 'Anna University',
    deptName: 'Civil Engineering',
    deptId: 'CE005',
    email: 'vikram.singh@annauniv.edu'
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing students (optional - remove if you want to keep existing data)
    console.log('🔄 Clearing existing students...');
    await Student.deleteMany({});
    console.log('✅ Existing students cleared');

    // Insert sample students
    console.log('🔄 Inserting sample students...');
    
    for (const studentData of sampleStudents) {
      const student = new Student(studentData);
      await student.save();
      console.log(`✅ Added student: ${student.studentName} (${student.studentId})`);
    }

    console.log('🎉 Sample data inserted successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('================================');
    
    sampleStudents.forEach((student, index) => {
      console.log(`${index + 1}. Student ID: ${student.studentId}`);
      console.log(`   Password: ${student.studentPassword}`);
      console.log(`   Name: ${student.studentName}`);
      console.log(`   College: ${student.collegeName}`);
      console.log('   -------------------------');
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();