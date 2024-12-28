import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['programming', 'ai', 'cybersecurity', 'data-science', 'web-development', 'other'],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  content: [{
    title: String,
    description: String,
    videoUrl: String,
    duration: String,
    resources: [{
      title: String,
      fileUrl: String,
      type: String,
    }],
  }],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  relatedWorkshops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalStudents: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Create index for search functionality
courseSchema.index({ title: 'text', description: 'text', category: 'text' });

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course; 