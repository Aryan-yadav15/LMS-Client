import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a workshop title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a workshop description'],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    enum: ['online', 'in-person'],
    required: true,
  },
  venue: {
    type: String,
    required: function() { return this.location === 'in-person'; }
  },
  meetingLink: {
    type: String,
    required: function() { return this.location === 'online'; }
  },
  agenda: [{
    time: String,
    title: String,
    description: String,
  }],
  prerequisites: [{
    type: String,
  }],
  materials: [{
    title: String,
    fileUrl: String,
  }],
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered',
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  }],
  relatedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Create index for search functionality
workshopSchema.index({ title: 'text', description: 'text' });

const Workshop = mongoose.models.Workshop || mongoose.model('Workshop', workshopSchema);

export default Workshop; 