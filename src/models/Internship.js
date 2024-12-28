import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an internship title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  company: {
    name: {
      type: String,
      required: true,
    },
    logo: String,
    website: String,
    location: String,
    description: String,
  },
  description: {
    type: String,
    required: [true, 'Please provide an internship description'],
  },
  requirements: [{
    type: String,
    required: true,
  }],
  responsibilities: [{
    type: String,
    required: true,
  }],
  duration: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  stipend: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    period: {
      type: String,
      enum: ['monthly', 'total'],
      default: 'monthly',
    },
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'hybrid'],
    required: true,
  },
  location: {
    type: String,
    required: function() { return this.type !== 'remote'; }
  },
  positions: {
    type: Number,
    required: true,
  },
  skills: [{
    type: String,
    required: true,
  }],
  applications: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected', 'accepted'],
      default: 'pending',
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: String,
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'closed', 'cancelled'],
    default: 'draft',
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['software', 'marketing', 'design', 'content', 'other'],
    required: true,
  },
}, {
  timestamps: true,
});

// Create index for search functionality
internshipSchema.index({ 
  title: 'text', 
  description: 'text', 
  'company.name': 'text',
  skills: 'text',
  category: 'text'
});

const Internship = mongoose.models.Internship || mongoose.model('Internship', internshipSchema);

export default Internship; 