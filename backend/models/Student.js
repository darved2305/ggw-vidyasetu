// models/Student.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    lowercase: true,
    validate: {
      validator: function(v) {
        return v === null || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
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

// Method to check password
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.studentPassword);
};

// Remove password from JSON output
studentSchema.methods.toJSON = function() {
  const student = this.toObject();
  delete student.studentPassword;
  return student;
};

export default mongoose.model('Student', studentSchema);