import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description'],
  },
  type: {
    type: String,
    enum: ['webinar', 'conference', 'meetup', 'hackathon', 'other'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    enum: ['online', 'in-person', 'hybrid'],
    required: true,
  },
  venue: {
    type: String,
    required: function() { return this.location !== 'online'; }
  },
  meetingLink: {
    type: String,
    required: function() { return this.location !== 'in-person'; }
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  speakers: [{
    name: String,
    bio: String,
    image: String,
    designation: String,
    organization: String,
  }],
  schedule: [{
    time: String,
    title: String,
    description: String,
    speaker: String,
  }],
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  registrations: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  }],
  resources: [{
    title: String,
    fileUrl: String,
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft',
  },
  tags: [{
    type: String,
  }],
  featuredImage: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create index for search functionality
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event; 