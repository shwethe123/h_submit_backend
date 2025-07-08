const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
  // --- Common Fields for Both Types ---
  postType: {
    type: String,
    enum: ['employer', 'seeker'], // Can only be one of these two values
    required: true,
  },
  userId: { // To link with your User model (e.g., Clerk user ID)
    type: String, 
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  coordinates: { // For map view
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { // Profile picture or Company logo
    type: String,
    required: true,
  },
  contactInfo: { // Phone, Email, etc.
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  reviews: [ // Array to store reviews
    {
      reviewerId: String,
      reviewerName: String,
      rating: Number, // 1 to 5
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],

  // --- Employer-Specific Fields ---
  companyName: {
    type: String,
    // Only required if postType is 'employer'
    required: function() { return this.postType === 'employer'; } 
  },
  jobTitle: {
    type: String,
    required: function() { return this.postType === 'employer'; }
  },
  jobDescription: {
    type: String,
    required: function() { return this.postType === 'employer'; }
  },
  salaryRange: {
    type: String, // e.g., "500,000 - 800,000 MMK"
  },

  // --- Job Seeker-Specific Fields ---
  fullName: {
    type: String,
    required: function() { return this.postType === 'seeker'; }
  },
  skill: { // The main skill or title
    type: String,
    required: function() { return this.postType === 'seeker'; }
  },
  bio: { // Short biography or introduction
    type: String,
  },
  experience: { // e.g., "5+ years of experience in plumbing"
    type: String,
  },
  
}, { timestamps: true });

// Create an index on postType for faster querying
jobPostSchema.index({ postType: 1 });

module.exports = mongoose.model("JobPost", jobPostSchema);